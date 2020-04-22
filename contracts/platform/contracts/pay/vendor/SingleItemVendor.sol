pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../../escrow/releaser/ICreditCardEscrow.sol";
import "../IPurchaseProcessor.sol";
import "./IVendor.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract SingleItemVendor is IVendor, Ownable {

    using SafeMath for uint256;

    IPurchaseProcessor.Currency public currency;
    // Price of each product sold by this contract
    uint256 public price;
    // SKU of the product sold by this contract
    bytes32 public sku;
    // Escrow contract
    ICreditCardEscrow public escrow;
    // Payment processor
    IPurchaseProcessor public pay;
    // Whether the contract is paused
    bool public paused;

    constructor(
        bytes32 _sku,
        IPurchaseProcessor.Currency _currency,
        uint256 _price,
        ICreditCardEscrow _escrow,
        IPurchaseProcessor _pay
    ) public {
        sku = _sku;
        currency = _currency;
        price = _price;
        escrow = _escrow;
        pay = _pay;
    }

    /** @dev Pause or unpause the contract
     *
     * @param _paused whether the contract should be paused
     */
    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
    }

    /** @dev Purchase assets
     *
     * @param _quantity the number of this product to purchase
     * @param _payment the details of the method by which payment will be made
     */
    function _purchase(
        uint256 _quantity,
        IPurchaseProcessor.PaymentParams memory _payment
    )
        internal
        returns (uint256 purchaseID)
    {
        return _purchaseFor(msg.sender, _quantity, _payment);
    }

    /** @dev Purchase assets for a user
     *
     * @param _recipient the user who will receive the assets
     * @param _quantity the number of this product to purchase
     * @param _payment the details of the method by which payment will be made
     */
    function _purchaseFor(
        address payable _recipient,
        uint256 _quantity,
        IPurchaseProcessor.PaymentParams memory _payment
    )
        internal
        returns (uint256 paymentID)
    {

        require(!paused, "IM:SimpleProduct: must be unpaused");
        require(_recipient != address(0), "IM:SimpleProduct: must be a valid recipient");
        require(_quantity > 0, "IM:SimpleProduct: must be a valid quantity");

        uint totalPrice = price.mul(_quantity);

        IPurchaseProcessor.Order memory order = IPurchaseProcessor.Order({
            currency: currency,
            totalPrice: totalPrice,
            sku: sku,
            quantity: _quantity,
            recipient: _recipient
        });

        paymentID = pay.process.value(msg.value)(order, _payment);

        return paymentID;
    }

}