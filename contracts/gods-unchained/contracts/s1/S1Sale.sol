pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "@imtbl/platform/contracts/pay/IPay.sol";
import "@imtbl/platform/contracts/product/MultiVendor.sol";

contract S1Sale is MultiVendor {

    /** @dev Purchase assets from a number of products
     *
     * @param _purchases details of the products being purchased
     * @param _referrer the address of the user who referred this purchase
     */
    function purchase(
        Purchase[] memory _purchases,
        address payable _referrer
    ) public payable {
        purchaseFor(msg.sender, _purchases, _referrer);
    }

    /** @dev Purchase assets from a number of products
     *
     * @param _recipient the user who will receive the assets
     * @param _purchases details of the products being purchased
     * @param _referrer the address of the user who referred this purchase
     */
    function purchaseFor(
        address payable _recipient,
        Purchase[] memory _purchases,
        address payable _referrer
    ) public payable {
        super.purchaseFor(_recipient, _purchases);
    }
}