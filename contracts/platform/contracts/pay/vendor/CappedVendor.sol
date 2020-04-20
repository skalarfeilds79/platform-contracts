pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "./SimpleVendor.sol";

contract CappedVendor is SimpleVendor {

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
    ) public SimpleVendor(_sku, _currency, _price, _escrow, _pay) {
        saleCap = _saleCap;
    }

    /** @dev Purchase assets for a user
     *
     * @param _recipient the user who will receive the assets
     * @param _quantity the number of this product to purchase
     * @param _payment the details of the method by which payment will be made
     */
    function _purchaseFor(
        address payable _recipient,
        uint256 _quantity,
        IPurchaseProcessor.PaymentParams memory _payment
    ) internal returns (uint256 purchaseID) {

        require(saleCap == 0 || saleCap >= sold + _quantity, "IM:CappedVendor: product cap has been exhausted");

        purchaseID = super._purchaseFor(_recipient, _quantity, _payment);

        sold += _quantity;
        return purchaseID;
    }

    /** @dev Returns whether this asset is still available */
    function available() public view returns (bool) {
        if (saleCap == 0) {
            return true;
        }
        return saleCap > sold;
    }


}