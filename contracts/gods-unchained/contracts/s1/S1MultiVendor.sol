pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "@imtbl/platform/contracts/pay/IPay.sol";
import "@imtbl/platform/contracts/vendor/IMultiVendor.sol";
import "./IS1Vendor.sol";

contract S1MultiVendor is IMultiVendor {

    struct Purchase {
        uint256 quantity;
        IS1Vendor vendor;
        IPay.Payment payment;
    }

    uint256 public incrementingID;

    /** @dev Purchase assets from a number of products
     *
     * @param _purchases details of the products being purchased
     * @param _referrer the address of the user who referred this purchase
     */
    function purchase(
        Purchase[] memory _purchases,
        address payable _referrer
    ) public payable returns (uint256, IMultiVendor.Receipt[] memory) {
        return purchaseFor(msg.sender, _purchases, _referrer);
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
    ) public payable returns (uint256, IMultiVendor.Receipt[] memory){
        IMultiVendor.Receipt[] memory receipts = new IMultiVendor.Receipt[](_purchases.length);
        for (uint i = 0; i < _purchases.length; i++) {
            Purchase memory p = _purchases[i];
            uint256 purchaseID = p.vendor.purchaseFor.value(msg.value)(
                _recipient,
                p.quantity,
                p.payment,
                _referrer
            );
            receipts[i] = IMultiVendor.Receipt({
                vendor: address(p.vendor),
                purchaseID: purchaseID
            });
        }
        uint256 id = incrementingID++;
        emit ProductsPurchased(id, receipts);
        return (id, receipts);
    }
}