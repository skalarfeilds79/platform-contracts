pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "@imtbl/platform/contracts/randomness/IBeacon.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./RarityProvider.sol";
import "./IPack.sol";
import "../../ICards.sol";
import "../raffle/IRaffle.sol";
import "../S1Vendor.sol";

contract Pack is IPack, S1Vendor, RarityProvider {

    // Emitted when the cards from a commitment are actually minted
    event CommitmentMinted(uint256 indexed commitmentID, uint256 lowTokenID, uint256 highTokenID, uint256 raffleTokenCount);
    // Emitted when a card commitment is recorded (either purchase or opening a chest)
    event CommitmentRecorded(uint256 indexed commitmentID, uint256 indexed callbackBlock);

    // A commitment to generating a certain number of packs for a certain user
    // Prefer commitment to purchase (includes cards opened from chests)
    struct Commitment {
        uint256 paymentID;
        uint256 commitBlock;
        uint256 quantity;
        uint256 escrowFor;
        address recipient;
        bool mintTickets;
    }

    // All commitments recorded by this pack
    mapping(uint256 => Commitment) public commitments;
    // The randomness beacon used by this pack
    IBeacon public beacon;
    // The core cards contract
    ICards public cards;
    // The raffle ticket contract
    IRaffle public raffle;
    // The address of the chest linked to this pack
    address public chest;
    // The number of commitments
    uint256 public commitmentCount;

    constructor(
        IRaffle _raffle,
        IBeacon _beacon,
        ICards _cards,
        IReferral _referral,
        bytes32 _sku,
        uint256 _price,
        ICreditCardEscrow _escrow,
        IPay _pay
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
        require(chest == address(0), "GU:S1:Pack: must not have already set chest");
        chest = _chest;
    }

    /** @dev Create cards from a commitment
     *
     * @param _commitmentID the ID of the commitment
     */
    function createCards(uint256 _commitmentID) public {
        Commitment memory commitment = commitments[_commitmentID];
        require(commitment.recipient != address(0), "GU:S1:Pack: must be a valid commitment");
        if (commitment.escrowFor == 0) {
            _createCards(_commitmentID, commitment, commitment.recipient);
        } else {
            _escrowCards(_commitmentID, commitment);
        }
    }

    function _escrowCards(
        uint256 _commitmentID,
        Commitment memory _commitment
    ) internal {

        uint cardCount = _commitment.quantity * 5;
        uint low = cards.nextBatch();
        uint high = low + cardCount;

        IEscrow.Vault memory vault = IEscrow.Vault({
            player: _commitment.recipient,
            releaser: address(escrow),
            asset: address(cards),
            balance: 0,
            lowTokenID: low,
            highTokenID: high,
            tokenIDs: new uint256[](0)
        });

        bytes memory data = abi.encodeWithSignature("escrowHook(uint256)", _commitmentID);

        escrow.callbackEscrow(vault, address(this), data, _commitment.paymentID, _commitment.escrowFor);
    }

    function _escrowTickets(
        uint256 _commitmentID,
        Commitment memory _commitment
    ) internal {

        IEscrow.Vault memory vault = IEscrow.Vault({
            player: _commitment.recipient,
            releaser: address(escrow),
            asset: address(referral),
            balance: _commitment.ticketCount,
            lowTokenID: 0,
            highTokenID: 0,
            tokenIDs: new uint256[](0)
        });

        bytes memory data = abi.encodeWithSignature("escrowHook(uint256)", _commitmentID);

        escrow.callbackEscrow(vault, address(this), data, _commitment.paymentID, _commitment.escrowFor);
    }

    function ticketsEscrowHook(uint256 _commitmentID) public {
        address protocol = address(escrow.getProtocol());
        require(msg.sender == protocol, "GU:S1:Pack: must be core escrow");
        Commitment memory commitment = commitments[_commitmentID];
        require(commitment.quantity > 0, "GU:S1:Pack: must have cards available");
        _createCards(_commitmentID, commitment, protocol);
        delete commitments[_commitmentID];
    }

    function cardsEscrowHook(uint256 _commitmentID) public {
        address protocol = address(escrow.getProtocol());
        require(msg.sender == protocol, "GU:S1:Pack: must be core escrow");
        Commitment memory commitment = commitments[_commitmentID];
        require(commitment.quantity > 0, "GU:S1:Pack: must have cards available");
        _createCards(_commitmentID, commitment, protocol);
        delete commitments[_commitmentID];
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
        IPay.Payment memory _payment,
        address payable _referrer
    ) public payable returns (uint256 paymentID) {
        paymentID = super.purchaseFor(_recipient, _quantity, _payment, _referrer);
        if (_payment.currency == IPay.Currency.ETH) {
            _createCommitment(paymentID, _recipient, _quantity, 0);
        } else {
            _createCommitment(paymentID, _recipient, _quantity, _payment.escrowFor);
        }
        return paymentID;
    }

    function _createCards(uint256 _commitmentID, Commitment memory _commitment, address _owner) internal {
        uint256 randomness = uint256(beacon.randomness(_commitment.commitBlock));
        uint cardCount = _commitment.quantity * 5;
        uint16[] memory protos = new uint16[](cardCount);
        uint8[] memory qualities = new uint8[](cardCount);
        for (uint i = 0; i < cardCount; i++) {
            (protos[i], qualities[i]) = _getCardDetails(i, randomness);
        }
        uint256 lowTokenID = cards.mintCards(_owner, protos, qualities);

        uint ticketsPerPack = _getTicketsPerPack(randomness);
        uint totalTickets = ticketsPerPack.mul(_purchase.quantity);
        raffle.mint(_owner, totalTickets);

        emit CommitmentMinted(_commitmentID, lowTokenID, lowTokenID + protos.length, totalTickets);
    }

    function openChests(address _owner, uint256 _quantity) public {
        require(msg.sender == chest, "GU:S1:Pack: must be the chest contract");

        uint256 commitmentID = commitmentCount++;
        uint256 commitBlock = beacon.commit(0);
        commitments[commitmentID] = Commitment({
            commitBlock: commitBlock,
            quantity: _quantity * 6,
            recipient: _owner,
            escrowFor: 0,
            paymentID: 0,
            mintTickets: !paused,
        });

        emit CommitmentRecorded(commitmentID, commitBlock);
    }

    function _createCommitment(
        uint256 _paymentID,
        address _recipient,
        uint256 _quantity,
        uint256 _escrowFor
    ) internal returns (uint256) {

        uint256 commitBlock = beacon.commit(0);

        uint256 commitmentID = commitmentCount++;

        commitments[commitmentID] = Commitment({
            commitBlock: commitBlock,
            quantity: _quantity,
            recipient: _recipient,
            escrowFor: _escrowFor,
            paymentID: _paymentID,
            mintTickets: true
        });

        emit CommitmentRecorded(commitmentID, commitBlock);
    }

    function _getCardDetails(uint _index, uint _random) internal view returns (uint16 proto, uint8 quality);

    function _getTicketsPerPack(uint _random) internal view returns (uint);

}