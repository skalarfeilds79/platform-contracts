pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "./IProduct.sol";
import "@imtbl/platform/contracts/pay/IPay.sol";

contract Sale {

    struct Purchase {
        // the product this user is purchasing
        IProduct product;
        // the quantity this user is purchasing
        uint256 quantity;
        // the details of the method by which payments will be made
        IPay.Payment payment;
    }

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
        for (uint i = 0; i < _purchases.length; i++) {
            Purchase memory p = _purchases[i];
            p.product.purchaseFor(
                _recipient,
                p.quantity,
                p.payment,
                _referrer
            );
        }
    }
}