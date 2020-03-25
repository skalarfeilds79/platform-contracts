pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../Product.sol";
import "./RarityProvider.sol";
import "../../ICards.sol";
import "@imtbl/platform/contracts/escrow/IBatchERC721Escrow.sol";
import "@imtbl/platform/contracts/randomness/IBeacon.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract Pack is Ownable, Product, RarityProvider {

    struct Purchase {
        uint64 commitBlock;
        uint32 qty;
        address user;
        uint64 escrowDuration;
    }

    // All purchases recorded by this pack
    Purchase[] public purchases;
    // The randomness beacon used by this pack
    IBeacon public beacon;
    // The core cards contract
    ICards public cards;
    // The address of the chest linked to this pack
    address public chest;

    constructor(
        IBeacon _beacon, ICards _cards,
        bytes32 _sku, uint256 _saleCap, uint _price,
        IReferral _referral, ICreditCardEscrow _fiatEscrow,
        IPay _processor
    ) public Product(
        _sku, _saleCap, _price, _referral, _fiatEscrow, _processor
    ) {
        beacon = _beacon;
        cards = _cards;
    }

    function setChest(address _chest) public onlyOwner {
        require(chest == address(0), "must not have already set chest");
        chest = _chest;
    }

    function createCards(uint256 purchaseID) public {
        require(purchaseID < purchases.length, "purchase ID invalid");
        Purchase memory purchase = purchases[purchaseID];
        if (purchase.escrowDuration == 0) {
            _createCards(purchase, purchase.user);
        } else {
            _escrowCards(purchaseID);
        }
    }

    function _escrowCards(uint256 id) internal {

        Purchase memory purchase = purchases[id];

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

        bytes memory data = abi.encodeWithSignature("escrowHook(uint256)", id);

        fiatEscrow.escrowBatch(vault, address(this), data, 64);
    }

    function escrowHook(uint256 id) public {
        address escrowAddress = address(fiatEscrow.getBatchEscrow());
        require(msg.sender == escrowAddress, "must be core escrow");
        Purchase memory purchase = purchases[id];
        _createCards(purchase, escrowAddress);
    }

    function purchaseFor(
        address user, uint256 qty, address payable referrer, IPay.Payment memory payment
    ) public {
        super.purchaseFor(user, qty, referrer, payment);
        uint64 escrowDuration = 0;
        if (payment.currency == IPay.Currency.USDCents) {
            escrowDuration = payment.receipt.details.requiredEscrowPeriod;
        }
        _createPurchase(user, qty, escrowDuration);
    }

    function _createCards(Purchase memory purchase, address user) internal {
        uint256 randomness = uint256(beacon.randomness(purchase.commitBlock));
        uint cardCount = purchase.qty * 5;
        uint16[] memory protos = new uint16[](cardCount);
        uint8[] memory qualities = new uint8[](cardCount);
        for (uint i = 0; i < cardCount; i++) {
            (protos[i], qualities[i]) = _getCardDetails(randomness, i);
        }
        cards.mintCards(user, protos, qualities);
    }

    function openChests(address user, uint256 qty) public {
        require(msg.sender == chest, "must be the chest contract");
        _createPurchase(user, qty, 0);
    }

    function _createPurchase(address user, uint256 qty, uint64 escrowDuration) internal returns (uint256) {
        return purchases.push(Purchase({
            commitBlock: uint64(beacon.commit(0)),
            qty: uint32(qty),
            user: user,
            escrowDuration: escrowDuration
        })) - 1;
    }

    function _getCardDetails(uint cardIndex, uint result) internal view returns (uint16 proto, uint8 quality);

}