pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "./Product.sol";

contract Sale {

    /** @dev Purchase assets from a number of products
     *
     * @param _products the products this user is purchasing
     * @param _quantities the quantities this user is purchasing
     * @param _payments the details of the method by which payments will be made
     * @param _referrer the address of the user who referred this purchase
     */
    function purchase(
        Product[] memory _products,
        uint256[] memory _quantities,
        IPay.Payment[] memory _payments,
        address payable _referrer
    ) public payable {
        purchaseFor(msg.sender, _products, _quantities, _payments, _referrer);
    }

    /** @dev Purchase assets from a number of products
     *
     * @param _recipient the user who will receive the assets
     * @param _products the products this user is purchasing
     * @param _quantities the quantities this user is purchasing
     * @param _payments the details of the method by which payments will be made
     * @param _referrer the address of the user who referred this purchase
     */
    function purchaseFor(
        address payable _recipient,
        Product[] memory _products,
        uint256[] memory _quantities,
        IPay.Payment[] memory _payments,
        address payable _referrer
    ) public payable {
        for (uint i = 0; i < _products.length; i++) {
            _products[i].purchaseFor(_recipient, _quantities[i], _payments[i], _referrer);
        }
    }
}