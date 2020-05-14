pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "./SingleItemVendor.sol";

contract CappedVendor is SingleItemVendor {

    using SafeMath for uint256;

    // Total number of this product which this contract can sell. 0 = no restriction
    uint256 public saleCap;
    // Total number of this product sold by this contract
    uint256 public sold;

    constructor(
        bytes32 _sku,
        IPurchaseProcessor.Currency _currency,
        uint256 _price,
        ICreditCardEscrow _escrow,
        IPurchaseProcessor _pay,
        uint256 _saleCap
    ) public SingleItemVendor(_sku, _currency, _price, _escrow, _pay) {
        saleCap = _saleCap;
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

        require(saleCap == 0 || saleCap >= sold + _order.quantity, "IM:CappedVendor: product cap has been exhausted");

        IPurchaseProcessor.Receipt memory receipt = super._purchaseFor(_order, _payment);

        sold += _order.quantity;
        return receipt;
    }

    /** @dev Returns whether this asset is still available */
    function available() public view returns (bool) {
        if (saleCap == 0) {
            return true;
        }
        return saleCap > sold;
    }


}