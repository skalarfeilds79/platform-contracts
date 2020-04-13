pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "./RarityProvider.sol";
import "../../ICards.sol";
import "@imtbl/platform/contracts/randomness/IBeacon.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./IPack.sol";
import "../raffle/IRaffle.sol";
import "../S1Vendor.sol";

contract Pack is IPack, S1Vendor, RarityProvider {

    // Emitted when the cards from a purchase are actually minted
    event PurchaseCardsMinted(uint256 indexed purchaseID, uint256 lowTokenID, uint256 highTokenID);
    // Emitted when a card purchase is recorded (either purchase or opening a chest)
    event CardPurchaseRecorded(uint256 indexed purchaseID, uint256 indexed callbackBlock);

    struct Purchase {
        uint256 commitBlock;
        uint256 quantity;
        uint256 escrowFor;
        address recipient;
    }

    // All purchases recorded by this pack
    mapping(uint256 => Purchase) public purchases;
    // The randomness beacon used by this pack
    IBeacon public beacon;
    // The core cards contract
    ICards public cards;
    // The raffle ticket contract
    IRaffle public raffle;
    // The address of the chest linked to this pack
    address public chest;

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

    /** @dev Purchase packs for a user
     *
     * @param _chest the chest contract for this pack
     */
    function setChest(address _chest) public onlyOwner {
        require(chest == address(0), "GU:S1:Pack: must not have already set chest");
        chest = _chest;
    }

    /** @dev Create cards from a purchase
     *
     * @param _purchaseID the ID of the purchase
     */
    function createCards(uint256 _purchaseID) public {
        Purchase memory purchase = purchases[_purchaseID];
        require(purchase.recipient != address(0), "GU:S1:Pack: must be a valid purchase");
        if (purchase.escrowFor == 0) {
            _createCards(_purchaseID, purchase, purchase.recipient);
        } else {
            _escrowCards(_purchaseID, purchase);
        }
    }

    function _escrowCards(uint256 _purchaseID, Purchase memory _purchase) internal {

        uint cardCount = _purchase.quantity * 5;
        uint low = cards.nextBatch();
        uint high = low + cardCount;

        IEscrow.Vault memory vault = IEscrow.Vault({
            player: _purchase.recipient,
            releaser: address(escrow),
            asset: address(cards),
            balance: 0,
            lowTokenID: low,
            highTokenID: high,
            tokenIDs: new uint256[](0)
        });

        bytes memory data = abi.encodeWithSignature("escrowHook(uint256)", _paymentID);

        uint256 escrowID = escrow.escrow(vault, address(this), data, _paymentID, _purchase.escrowFor);

        emit ProductEscrowed(_purchaseID, escrowID);
    }

    function escrowHook(uint256 _purchaseID) public {
        address protocol = address(escrow.getProtocol());
        require(msg.sender == protocol, "GU:S1:Pack: must be core escrow");
        Purchase memory purchase = purchases[_purchaseID];
        require(purchase.quantity > 0, "GU:S1:Pack: must have cards available");
        _createCards(_purchaseID, purchase, protocol);
        delete purchases[_purchaseID];
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
    ) public payable returns (uint256 purchaseID) {
        purchaseID = super.purchaseFor(_recipient, _quantity, _payment, _referrer);
        if (_payment.currency == IPay.Currency.ETH) {
            _createPurchase(purchaseID, _recipient, _quantity, 0);
        } else {
            _createPurchase(purchaseID, _recipient, _quantity, _payment.escrowFor);
        }
        return purchaseID;
    }

    function _createCards(uint256 _purchaseID, Purchase memory _purchase, address _owner) internal {
        uint256 randomness = uint256(beacon.randomness(_purchase.commitBlock));
        uint cardCount = _purchase.quantity * 5;
        uint16[] memory protos = new uint16[](cardCount);
        uint8[] memory qualities = new uint8[](cardCount);
        for (uint i = 0; i < cardCount; i++) {
            (protos[i], qualities[i]) = _getCardDetails(i, randomness);
        }
        uint256 lowTokenID = cards.mintCards(_owner, protos, qualities);

        emit PurchaseCardsMinted(_purchaseID, lowTokenID, lowTokenID + protos.length);
    }

    function openChests(address _owner, uint256 _quantity) public {
        require(msg.sender == chest, "GU:S1:Pack: must be the chest contract");
        // skip emitting product purchased
        uint256 purchaseID = purchaseCount++;
        uint256 commitBlock = beacon.commit(0);
        purchases[purchaseID] = Purchase({
            commitBlock: commitBlock,
            quantity: _quantity * 6,
            recipient: _owner,
            escrowFor: 0
        });

        emit CardPurchaseRecorded(purchaseID, commitBlock);
    }

    function _createPurchase(
        uint256 _purchaseID,
        address _recipient,
        uint256 _quantity,
        uint256 _escrowFor
    ) internal returns (uint256) {

        uint256 commitBlock = beacon.commit(0);

        purchases[_purchaseID] = Purchase({
            commitBlock: commitBlock,
            quantity: _quantity,
            recipient: _recipient,
            escrowFor: _escrowFor
        });

        emit CardPurchaseRecorded(_purchaseID, commitBlock);
    }

    function _getCardDetails(uint _index, uint _random) internal view returns (uint16 proto, uint8 quality);

}