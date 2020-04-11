pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../pay/IPay.sol";

contract IProduct {

    // Emitted when a purchase is made
    event ProductPurchased(uint256 indexed purchaseID, uint256 indexed paymentID);
    // Emitted when as purchase is escrowed
    event PurchaseEscrowed(uint256 indexed purchaseID, uint256 indexed escrowID);
    // Emitted when a referral has been made
    event PurchaseReferred(uint256 indexed purchaseID, address indexed referrer);

    /** @dev Purchase assets for a user
     *
     * @param _recipient the user who will receive the assets
     * @param _quantity the number of this product to purchase
     * @param _payment the details of the method by which payment will be made
     */
    function purchaseFor(
        address payable _recipient,
        uint256 _quantity,
        IPay.Payment memory _payment
    ) public payable returns (uint256 purchaseID);

    /** @dev Purchase assets
     *
     * @param _quantity the number of this product to purchase
     * @param _payment the details of the method by which payment will be made
     */
    function purchase(
        uint256 _quantity,
        IPay.Payment memory _payment
    ) public payable returns (uint256 purchaseID);
}