pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@imtbl/platform/contracts/pay/PurchaseProcessor.sol";
import "./IS1Vendor.sol";

contract S1Sale is Ownable {

    using SafeMath for uint256;

    struct ProductPurchaseRequest {
        uint256 quantity;
        IS1Vendor vendor;
        PurchaseProcessor.PaymentParams payment;
    }

    struct UserProductPurchaseRequest {
        address payable recipient;
        uint256 quantity;
        IS1Vendor vendor;
        PurchaseProcessor.PaymentParams payment;
    }

    // Whether this contract can be used as a vendor
    mapping(address => bool) public isVendorApproved;

    function setVendorApproval(bool _approved, address[] calldata _vendors) external onlyOwner {
        require(_vendors.length > 0, "S1Sale: must provide some vendors");
        for (uint i = 0; i < _vendors.length; i++) {
            isVendorApproved[_vendors[i]] = _approved;
        }
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
            require(isVendorApproved[address(p.vendor)], "S1Sale: unapproved vendor");
            p.vendor.purchaseFor.value(address(this).balance)(
                _recipient,
                p.quantity,
                p.payment,
                _referrer
            );
        }
        if (address(this).balance > 0) {
            // solium-disable-next-line
            msg.sender.call.value(address(this).balance)("");
        }
    }

    function purchaseForAll(
        UserProductPurchaseRequest[] memory _requests,
        address payable _referrer
    ) public payable {
        for (uint i = 0; i < _requests.length; i++) {
            UserProductPurchaseRequest memory p = _requests[i];
            require(isVendorApproved[address(p.vendor)], "S1Sale: unapproved vendor");
            p.vendor.purchaseFor.value(address(this).balance)(
                p.recipient,
                p.quantity,
                p.payment,
                _referrer
            );
        }
        if (address(this).balance > 0) {
            // solium-disable-next-line
            msg.sender.call.value(address(this).balance)("");
        }
    }

    function () external payable {

    }
}