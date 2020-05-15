pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@imtbl/platform/contracts/pay/IPurchaseProcessor.sol";
import "./IS1Vendor.sol";

contract S1Sale {

    using SafeMath for uint256;

    event LogState(uint index, uint balance);

    struct ProductPurchaseRequest {
        uint256 quantity;
        IS1Vendor vendor;
        IPurchaseProcessor.PaymentParams payment;
    }

    /** @dev Purchase assets from a number of products
     *
     * @param _requests details of the products being purchased
     * @param _referrer the address of the user who referred this purchase
     */
    function purchase(
        ProductPurchaseRequest[] memory _requests,
        address payable _referrer
    ) public payable {
        purchaseFor(msg.sender, _requests, _referrer);
    }

    /** @dev Purchase assets from a number of products
     *
     * @param _recipient the user who will receive the assets
     * @param _requests details of the products being purchased
     * @param _referrer the address of the user who referred this purchase
     */
    function purchaseFor(
        address payable _recipient,
        ProductPurchaseRequest[] memory _requests,
        address payable _referrer
    ) public payable  {
        for (uint i = 0; i < _requests.length; i++) {
            ProductPurchaseRequest memory p = _requests[i];
            p.vendor.purchaseFor.value(address(this).balance)(
                _recipient,
                p.quantity,
                p.payment,
                _referrer
            );
        }
    }

    function () external payable {

    }
}