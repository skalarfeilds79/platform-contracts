pragma solidity 0.5.11;

import "../Product.sol";
import "./RarityProvider.sol";
import "../../ICards.sol";
import "@imtbl/platform/contracts/escrow/BatchERC721Escrow.sol";
import "@imtbl/platform/contracts/randomness/IBeacon.sol";

contract Pack is Product, Rarity {

    struct Purchase {
        uint64 commitBlock;
        uint32 qty;
        address user;
        uint64 escrowPeriod;
    }

    // All purchases recorded by this pack
    Purchase[] public purchases;
    // The randomness beacon used by this pack
    IBeacon public beacon;
    // The core cards contract
    ICards public cards;

    constructor(
        IBeacon _beacon, ICards _cards,
        bytes32 _sku, uint256 _saleCap, uint _price,
        IReferral _referral, ICreditCardEscrow _fiatEscrow,
        IEscrow _escrow, IProcessor _processor
    ) public Product(
        _sku, _saleCap, _price, _referral, _fiatEscrow, _escrow, _processor
    ) {
        beacon = _beacon;
        cards = _cards;
    }

    function createCards(uint256 purchaseID) public {
        require(purchaseID < purchases.length, "purchase ID invalid");
        Purchase memory purchase = purchases[purchaseID];
    }

    function escrowHook(uint256 purchaseID) public {
        require(msg.sender == escrowCore, "must be escrow core to use hook");
        require(purchaseID < purchases.length, "purchase ID invalid");
        _createCards(purchaseID);
    }

    function _escrowCards(Purchase memory purchase) internal {
        uint cardCount = purchase.qty.mul(5);
        uint low = cards.nextBatch();
        uint high = low + cardCount;

        BatchERC721Escrow.Vault memory vault = BatchERC721Escrow.Vault({
            player: user,
            releaser: address(escrow),
            asset: IERC721(cards),
            lowTokenID: low,
            highTokenID: high
        });

        bytes memory data = abi.encodeWithSignature("escrowHook(uint256)", purchaseID);

        uint id = escrow.escrowBatch(vault, address(this), data, purchase.escrowPeriod, user);

    }

    function purchaseFor(address user, uint256 qty, address referrer, Processor.Payment memory payment) public {
        super.purchaseFor(user, qty, referrer, payment);
        // bool shouldEscrow = (payment.type == Processor.PaymentType.FIAT);
        // _createPurchase(user, qty shouldEscrow);
    }

    function _createCards(Purchase memory purchase) internal {
        bytes32 randomness = beacon.getRandomness(commitBlock);
        uint cardCount = purchase.qty.mul(5);
        uint16[] memory protos = new uint16[](cardCount);
        uint16[] memory qualities = new uint8[](cardCount);
        for (uint i = 0; i < cardCount; i++) {
            (protos[i], qualities[i]) = getCardDetails(randomness, i);
        }
        cards.mintCards(purchase.user, protos, qualities);
    }

    function openChests(address user, uint256 qty) public {
        require(msg.sender == chest, "must be the chest contract");
        _createPurchase(user, qty, false);
    }

    function _createPurchase(address user, uint256 qty, bool shouldEscrow) internal returns (uint256) {
        return purchases.push(Purchase({
            commitBlock: beacon.commit(0),
            qty: qty,
            user: user,
            shouldEscrow: shouldEscrow
        })) - 1;
    }

    function _getCardDetails(uint cardIndex, uint result) internal view returns (uint16 proto, uint8 quality);

}