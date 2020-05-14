pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../../escrow/releaser/ICreditCardEscrow.sol";
import "../IPurchaseProcessor.sol";
import "./IVendor.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract SingleItemVendor is IVendor, Ownable {

    using SafeMath for uint256;

    IPurchaseProcessor.Currency public currency;
    // Price of each product sold by this contract
    uint256 public price;
    // SKU of the product sold by this contract
    bytes32 public sku;
    // Escrow contract
    ICreditCardEscrow public escrow;
    // Payment processor
    IPurchaseProcessor public pay;
    // Whether the contract is paused
    bool public paused;

    constructor(
        bytes32 _sku,
        IPurchaseProcessor.Currency _currency,
        uint256 _price,
        ICreditCardEscrow _escrow,
        IPurchaseProcessor _pay
    ) public {
        sku = _sku;
        currency = _currency;
        price = _price;
        escrow = _escrow;
        pay = _pay;
    }

    /** @dev Pause or unpause the contract
     *
     * @param _paused whether the contract should be paused
     */
    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
    }

    /** @dev Purchase assets for a user
     *
     * @param _order the details of the order (set by vendor)
     * @param _payment the details of the purchase (set by buyer)
     */
    function _purchaseFor(
        IPurchaseProcessor.Order memory _order,
        IPurchaseProcessor.PaymentParams memory _payment
    ) internal returns (IPurchaseProcessor.Receipt memory) {

        require(!paused, "IM:SingleItemVendor: must be unpaused");
        require(_order.quantity > 0, "IM:SingleItemVendor: must be a valid quantity");

        return pay.process.value(msg.value)(_order, _payment);
    }

}