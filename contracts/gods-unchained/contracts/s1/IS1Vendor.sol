pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "@imtbl/platform/contracts/pay/IPurchaseProcessor.sol";

interface IS1Vendor {

    /** @dev Purchase assets
     *
     * @param _quantity the number of this product to purchase
     * @param _payment the details of the method by which payment will be made
     * @param _referrer the address of the user who made this referral
     */
    function purchase(
        uint256 _quantity,
        IPurchaseProcessor.PaymentParams calldata _payment,
        address payable _referrer
    )
        external
        payable
        returns (IPurchaseProcessor.Receipt memory);

    /** @dev Purchase assets for a user
     *
     * @param _recipient the user who will receive the assets
     * @param _quantity the number of this product to purchase
     * @param _payment the details of the method by which payment will be made
     * @param _referrer the address of the user who made this referral
     */
    function purchaseFor(
        address payable _recipient,
        uint256 _quantity,
        IPurchaseProcessor.PaymentParams calldata _payment,
        address payable _referrer
    ) external payable returns (IPurchaseProcessor.Receipt memory);

}