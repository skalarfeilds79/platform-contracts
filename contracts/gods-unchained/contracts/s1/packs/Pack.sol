pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../Product.sol";
import "./RarityProvider.sol";
import "../../ICards.sol";
import "@imtbl/platform/contracts/escrow/IBatchERC721Escrow.sol";
import "@imtbl/platform/contracts/randomness/IBeacon.sol";

contract Pack is Product, RarityProvider {

    struct Purchase {
        uint64 commitBlock;
        uint32 qty;
        address user;
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
        IProcessor _processor
    ) public Product(
        _sku, _saleCap, _price, _referral, _fiatEscrow, _processor
    ) {
        beacon = _beacon;
        cards = _cards;
    }

    function createCards(uint256 purchaseID) public {
        require(purchaseID < purchases.length, "purchase ID invalid");
        Purchase memory purchase = purchases[purchaseID];
    }

    function escrowHook(uint256 purchaseID) public {
        // require(msg.sender == escrowCore, "must be escrow core to use hook");
        require(purchaseID < purchases.length, "purchase ID invalid");
        _createCards(purchaseID);
    }

    function _escrowCards(uint purchaseID) internal {
        Purchase memory purchase = purchases[purchaseID];
        uint cardCount = purchase.qty * 5;
        uint low = cards.nextBatch();
        uint high = low + cardCount;

        IBatchERC721Escrow.Vault memory vault = IBatchERC721Escrow.Vault({
            player: purchase.user,
            releaser: address(fiatEscrow),
            asset: IERC721(address(cards)),
            lowTokenID: low,
            highTokenID: high
        });

        bytes memory data = abi.encodeWithSignature("escrowHook(uint256)", purchaseID);

        uint id = fiatEscrow.escrowBatch(
            vault, address(this), data, 64, purchase.user
        );

    }

    function purchaseFor(
        address user, uint256 qty, address payable referrer, IProcessor.Payment memory payment
    ) public {
        super.purchaseFor(user, qty, referrer, payment);
        bool shouldEscrow = (payment.currency == IProcessor.Currency.Fiat);
        _createPurchase(user, qty, shouldEscrow);
    }

    function _createCards(uint256 purchaseID) internal {
        Purchase memory purchase = purchases[purchaseID];
        uint256 randomness = uint256(beacon.randomness(purchase.commitBlock));
        uint cardCount = purchase.qty * 5;
        uint16[] memory protos = new uint16[](cardCount);
        uint8[] memory qualities = new uint8[](cardCount);
        for (uint i = 0; i < cardCount; i++) {
            (protos[i], qualities[i]) = _getCardDetails(randomness, i);
        }
        cards.mintCards(purchase.user, protos, qualities);
    }

    function openChests(address user, uint256 qty) public {
        // require(msg.sender == chest, "must be the chest contract");
        _createPurchase(user, qty, false);
    }

    function _createPurchase(address user, uint256 qty, bool shouldEscrow) internal returns (uint256) {
        return purchases.push(Purchase({
            commitBlock: uint64(beacon.commit(0)),
            qty: uint32(qty),
            user: user
        })) - 1;
    }

    function _getCardDetails(uint cardIndex, uint result) internal view returns (uint16 proto, uint8 quality);

}