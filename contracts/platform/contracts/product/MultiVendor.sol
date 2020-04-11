pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../pay/IPay.sol";
import "./IProduct.sol";

contract MultiVendor {

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
     */
    function purchase(Purchase[] memory _purchases) public payable {
        purchaseFor(msg.sender, _purchases);
    }

    /** @dev Purchase assets from a number of products
     *
     * @param _recipient the user who will receive the assets
     * @param _purchases details of the products being purchased
     */
    function purchaseFor(address payable _recipient, Purchase[] memory _purchases) public payable {
        for (uint i = 0; i < _purchases.length; i++) {
            Purchase memory p = _purchases[i];
            p.product.purchaseFor(
                _recipient,
                p.quantity,
                p.payment
            );
        }
    }

}