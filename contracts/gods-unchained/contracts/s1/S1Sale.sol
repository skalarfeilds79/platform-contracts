pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "@imtbl/platform/contracts/pay/IPurchaseProcessor.sol";
import "./IS1Vendor.sol";

contract S1Sale {

    struct PurchaseIntent {
        uint256 quantity;
        IS1Vendor vendor;
        IPurchaseProcessor.PaymentParams payment;
    }

    /** @dev Purchase assets from a number of products
     *
     * @param _intents details of the products being purchased
     * @param _referrer the address of the user who referred this purchase
     */
    function purchase(
        PurchaseIntent[] memory _intents,
        address payable _referrer
    ) public payable {
        purchaseFor(msg.sender, _intents, _referrer);
    }

    /** @dev Purchase assets from a number of products
     *
     * @param _recipient the user who will receive the assets
     * @param _intents details of the products being purchased
     * @param _referrer the address of the user who referred this purchase
     */
    function purchaseFor(
        address payable _recipient,
        PurchaseIntent[] memory _intents,
        address payable _referrer
    ) public payable  {
        for (uint i = 0; i < _intents.length; i++) {
            PurchaseIntent memory p = _intents[i];
            p.vendor.purchaseFor.value(msg.value)(
                _recipient,
                p.quantity,
                p.payment,
                _referrer
            );
        }
    }
}