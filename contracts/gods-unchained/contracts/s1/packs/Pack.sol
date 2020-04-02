pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../Product.sol";
import "./RarityProvider.sol";
import "../../ICards.sol";
import "@imtbl/platform/contracts/randomness/IBeacon.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract Pack is Ownable, Product, RarityProvider {

    struct Purchase {
        uint256 commitBlock;
        uint32 qty;
        address user;
        uint256 escrowDuration;
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
        IBeacon _beacon,
        ICards _cards,
        bytes32 _sku,
        uint256 _saleCap,
        uint256 _price,
        IReferral _referral,
        ICreditCardEscrow _fiatEscrow,
        IPay _processor
    ) public Product(
        _sku, _saleCap, _price, _referral, _fiatEscrow, _processor
    ) {
        beacon = _beacon;
        cards = _cards;
    }

    /** @dev Purchase packs for a user
     *
     * @param _chest the chest contract for this pack
     */
    function setChest(address _chest) public onlyOwner {
        require(chest == address(0), "must not have already set chest");
        chest = _chest;
    }

    /** @dev Create cards from a purchase
     *
     * @param _id the ID of the purchase
     */
    function createCards(uint256 _id) public {
        require(_id < purchases.length, "purchase ID invalid");
        Purchase memory purchase = purchases[_id];
        if (purchase.escrowDuration == 0) {
            _createCards(purchase, purchase.user);
        } else {
            _escrowCards(_id);
        }
    }

    function _escrowCards(uint256 _id) internal {

        Purchase memory purchase = purchases[_id];

        uint cardCount = purchase.qty * 5;
        uint low = cards.nextBatch();
        uint high = low + cardCount;

        IEscrow.Vault memory vault = IEscrow.Vault({
            player: purchase.user,
            releaser: address(fiatEscrow),
            asset: address(cards),
            balance: 0,
            lowTokenID: low,
            highTokenID: high,
            tokenIDs: new uint256[](0)
        });

        bytes memory data = abi.encodeWithSignature("escrowHook(uint256)", _id);

        fiatEscrow.escrow(vault, address(this), data, purchase.escrowDuration);
    }

    function escrowHook(uint256 id) public {
        address protocol = address(fiatEscrow.getProtocol());
        require(msg.sender == protocol, "must be core escrow");
        Purchase memory purchase = purchases[id];
        _createCards(purchase, protocol);
        delete purchases[id];
    }

    /** @dev Purchase packs for a user
     *
     * @param _user the user who will receive the packs
     * @param _qty the number of packs to purchase
     * @param _referrer the address of the user who made this referral
     * @param _payment the details of the method by which payment will be made
     */
    function purchaseFor(
        address _user,
        uint256 _qty,
        address payable _referrer,
        IPay.Payment memory _payment
    ) public {
        super.purchaseFor(_user, _qty, _referrer, _payment);
        _createPurchase(_user, _qty, _payment.escrowFor);
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

    function _createPurchase(address user, uint256 qty, uint256 escrowDuration) internal returns (uint256) {
        return purchases.push(Purchase({
            commitBlock: beacon.commit(0),
            qty: uint32(qty),
            user: user,
            escrowDuration: escrowDuration
        })) - 1;
    }

    function _getCardDetails(uint _index, uint _random) internal view returns (uint16 proto, uint8 quality);

}