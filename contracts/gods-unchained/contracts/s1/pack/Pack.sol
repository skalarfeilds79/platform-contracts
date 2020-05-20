pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "@imtbl/platform/contracts/randomness/Beacon.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./RarityProvider.sol";
import "./IPack.sol";
import "../../ICards.sol";
import "../raffle/IRaffle.sol";
import "../S1Vendor.sol";

contract Pack is IPack, S1Vendor, RarityProvider {

    // Emitted when the cards from a commitment are actually minted
    event PackCardsMinted(uint256 indexed commitmentID, uint256 lowTokenID, uint256 highTokenID);
    // Emitted when a card commitment is recorded (either purchase or opening a chest)
    event CommitmentRecorded(uint256 indexed commitmentID, Commitment commitment);
    // Emitted when the tickets from a commitment are actually minted
    event TicketsMinted(uint256 indexed commitmentID, uint16[] ticketCounts);

    // A commitment to generating a certain number of packs for a certain user
    // Prefer commitment to purchase (includes cards opened from chests)
    struct Commitment {
        uint256 paymentID;
        uint256 commitBlock;
        uint256 packQuantity;
        uint256 ticketQuantity;
        uint256 escrowFor;
        address recipient;
    }

    // All commitments recorded by this pack
    mapping(uint256 => Commitment) public commitments;
    // The randomness beacon used by this pack
    Beacon public beacon;
    // The core cards contract
    ICards public cards;
    // The raffle ticket contract
    IRaffle public raffle;
    // The address of the chest linked to this pack
    address public chest;
    // The number of commitments
    uint256 public commitmentCount;

    function _getCardDetails(uint _index, uint _random)
        internal
        view
        returns (uint16 proto, uint8 quality);

    function _getTicketsInPack(uint _index, uint _random)
        internal
        pure
        returns (uint16);

    constructor(
        IRaffle _raffle,
        Beacon _beacon,
        ICards _cards,
        IReferral _referral,
        bytes32 _sku,
        uint256 _price,
        CreditCardEscrow _escrow,
        PurchaseProcessor _pay
    ) public S1Vendor(_referral, _sku, _price, _escrow, _pay) {
        raffle = _raffle;
        beacon = _beacon;
        cards = _cards;
    }

    /** @dev Set the chest address for this contract
     *
     * @param _chest the chest contract for this pack
     */
    function setChest(address _chest) public onlyOwner {
        require(
            chest == address(0),
            "S1Pack: must not have already set chest"
        );
        chest = _chest;
    }

    /** @dev Create cards from a commitment
     *
     * @param _commitmentID the ID of the commitment
     */
    function mint(uint256 _commitmentID) public {
        Commitment memory commitment = commitments[_commitmentID];
        require(
            commitment.recipient != address(0),
            "S1Pack: must be a valid commitment"
        );

        if (commitment.escrowFor == 0) {
            _createCards(_commitmentID, commitment, commitment.recipient);
            _createTickets(_commitmentID, commitment, commitment.recipient);
        } else {
            _escrowCards(_commitmentID, commitment);
            _escrowTickets(_commitmentID, commitment);
        }
    }

    function _escrowCards(uint256 _commitmentID, Commitment memory _commitment) internal {

        uint cardCount = _commitment.packQuantity * 5;
        uint low = cards.nextBatch();
        uint high = low + cardCount;

        Escrow.Vault memory vault = Escrow.Vault({
            player: _commitment.recipient,
            admin: address(escrow),
            asset: address(cards),
            balance: 0,
            lowTokenID: low,
            highTokenID: high,
            tokenIDs: new uint256[](0)
        });

        bytes memory data = abi.encodeWithSignature("cardsEscrowHook(uint256)", _commitmentID);

        escrow.callbackEscrow(
            vault,
            address(this),
            data,
            _commitment.paymentID,
            _commitment.escrowFor
        );
    }

    function _getRandomness(
        uint256 _commitmentID,
        Commitment memory _commitment
    )
        internal
        returns (uint256)
    {
        bytes32 base = beacon.randomness(_commitment.commitBlock);
        bytes32 hashed = keccak256(abi.encodePacked(base, _commitmentID));
        return uint256(hashed);
    }

    function _escrowTickets(
        uint256 _commitmentID,
        Commitment memory _commitment
    )
        internal
    {

        if (_commitment.ticketQuantity == 0) {
            return;
        }

        uint randomness = _getRandomness(_commitmentID, _commitment);
        uint totalTickets = 0;
        for (uint i = 0; i < _commitment.ticketQuantity; i++) {
            uint16 qty = _getTicketsInPack(i, randomness);
            totalTickets += qty;
        }

        Escrow.Vault memory vault = Escrow.Vault({
            player: _commitment.recipient,
            admin: address(escrow),
            asset: address(raffle),
            balance: totalTickets,
            lowTokenID: 0,
            highTokenID: 0,
            tokenIDs: new uint256[](0)
        });

        bytes memory data = abi.encodeWithSignature("ticketsEscrowHook(uint256)", _commitmentID);

        escrow.callbackEscrow(
            vault,
            address(this),
            data,
            _commitment.paymentID,
            _commitment.escrowFor
        );
    }

    function ticketsEscrowHook(uint256 _commitmentID) public {
        address protocol = address(escrow.getProtocol());

        require(
            msg.sender == protocol,
            "S1Pack: must be core escrow"
        );

        Commitment memory commitment = commitments[_commitmentID];

        require(
            commitment.ticketQuantity > 0,
            "S1Pack: must have tickets available"
        );

        _createTickets(_commitmentID, commitment, protocol);
        commitments[_commitmentID].ticketQuantity = 0;
        // if there's nothing left to do on this purchase, clear it
        if (commitments[_commitmentID].packQuantity == 0) {
            delete commitments[_commitmentID];
        }
    }

    function cardsEscrowHook(uint256 _commitmentID) public {
        address protocol = address(escrow.getProtocol());

        require(
            msg.sender == protocol,
            "S1Pack: must be core escrow"
        );

        Commitment memory commitment = commitments[_commitmentID];

        require(
            commitment.packQuantity > 0,
            "S1Pack: must have cards available"
        );

        _createCards(_commitmentID, commitment, protocol);
        commitments[_commitmentID].packQuantity = 0;
        // if there's nothing left to do on this purchase, clear it
        if (commitments[_commitmentID].ticketQuantity == 0) {
            delete commitments[_commitmentID];
        }
    }

    /** @dev Purchase packs for a user
     *
     * @param _recipient the user who will receive the packs
     * @param _quantity the number of packs to purchase
     * @param _payment the details of the method by which payment will be made
     * @param _referrer the address of the user who made this referral
     */
    function purchaseFor(
        address payable _recipient,
        uint256 _quantity,
        PurchaseProcessor.PaymentParams memory _payment,
        address payable _referrer
    )
        public
        payable
        returns (PurchaseProcessor.Receipt memory)
    {
        PurchaseProcessor.Receipt memory receipt = super.purchaseFor(
            _recipient,
            _quantity,
            _payment,
            _referrer
        );
        if (_payment.currency == PurchaseProcessor.Currency.ETH) {
            _createCommitment(receipt.id, _recipient, _quantity, 0);
        } else {
            _createCommitment(receipt.id, _recipient, _quantity, _payment.escrowFor);
        }
        return receipt;
    }

    function _createTickets(
        uint256 _commitmentID,
        Commitment memory _commitment,
        address _owner
    ) internal {

        if (_commitment.ticketQuantity == 0) {
            return;
        }

        uint randomness = _getRandomness(_commitmentID, _commitment);
        uint16[] memory ticketQuantities = new uint16[](_commitment.ticketQuantity);
        uint totalTickets = 0;
        for (uint i = 0; i < _commitment.ticketQuantity; i++) {
            uint16 qty = _getTicketsInPack(i, randomness);
            totalTickets += qty;
            ticketQuantities[i] = qty;
        }
        raffle.mint(_owner, totalTickets);
        emit TicketsMinted(_commitmentID, ticketQuantities);
        emit PaymentERC20Minted(
            _commitment.paymentID,
            address(raffle),
            totalTickets
        );
    }

    function _createCards(
        uint256 _commitmentID,
        Commitment memory _commitment,
        address _owner
    ) internal {
        uint256 randomness = _getRandomness(_commitmentID, _commitment);
        uint cardCount = _commitment.packQuantity * 5;
        uint16[] memory protos = new uint16[](cardCount);
        uint8[] memory qualities = new uint8[](cardCount);
        for (uint i = 0; i < cardCount; i++) {
            (protos[i], qualities[i]) = _getCardDetails(i, randomness);
        }
        uint256 lowTokenID = cards.mintCards(_owner, protos, qualities);
        uint256 highTokenID = lowTokenID + protos.length;

        emit PackCardsMinted(_commitmentID, lowTokenID, highTokenID);
        emit PaymentERC721RangeMinted(
            _commitment.paymentID,
            address(cards),
            lowTokenID,
            highTokenID
        );
    }

    function openChests(address _owner, uint256 _quantity) public {
        require(
            msg.sender == chest,
            "S1Pack: must be the chest contract"
        );

        uint256 commitmentID = commitmentCount++;
        uint256 commitBlock = beacon.commit(0);
        Commitment memory commitment = Commitment({
            commitBlock: commitBlock,
            packQuantity: _quantity * 6,
            recipient: _owner,
            escrowFor: 0,
            paymentID: 0,
            ticketQuantity: paused() ? 0 : _quantity * 6
        });

        commitments[commitmentID] = commitment;
        emit CommitmentRecorded(commitmentID, commitment);
    }

    function _createCommitment(
        uint256 _paymentID,
        address _recipient,
        uint256 _quantity,
        uint256 _escrowFor
    ) internal returns (uint256) {

        uint256 commitBlock = beacon.commit(0);
        uint256 commitmentID = commitmentCount++;
        Commitment memory commitment = Commitment({
            commitBlock: commitBlock,
            packQuantity: _quantity,
            recipient: _recipient,
            escrowFor: _escrowFor,
            paymentID: _paymentID,
            ticketQuantity: _quantity
        });

        commitments[commitmentID] = commitment;

        emit CommitmentRecorded(commitmentID, commitment);
    }

}