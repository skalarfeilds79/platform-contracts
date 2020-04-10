pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "./referral/IReferral.sol";
import "@imtbl/platform/contracts/escrow/releaser/ICreditCardEscrow.sol";
import "@imtbl/platform/contracts/pay/IPay.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract Product is Ownable {

    using SafeMath for uint256;

    // Emitted when a product is purchased
    event ProductPurchased(uint256 indexed purchaseID, uint256 indexed paymentID);
    // Emitted when as product is escrowed
    event ProductEscrowed(uint256 indexed purchaseID, uint256 indexed escrowID);

    // Total number of this product which this contract can sell
    uint256 public saleCap;
    // Total number of this product sold by this contract
    uint256 public sold;
    // Price of each product sold by this contract
    uint256 public price;
    // SKU of the product sold by this contract
    bytes32 public sku;
    // Referral contract
    IReferral public referral;
    // Escrow contract
    ICreditCardEscrow public fiatEscrow;
    // Payment processor
    IPay public processor;
    // Maximum number of this item which can be purchase in one tx. 0 if no restriction
    uint256 public maxQuantity;
    // Whether the contract is paused
    bool public paused;
    // Total number of purchases processed through this contract
    uint256 public purchaseCount;

    constructor(
        bytes32 _sku,
        uint256 _saleCap,
        uint256 _maxQuantity,
        uint256 _price,
        IReferral _referral,
        ICreditCardEscrow _fiatEscrow,
        IPay _processor
    ) public {
        sku = _sku;
        saleCap = _saleCap;
        maxQuantity = _maxQuantity;
        price = _price;
        referral = _referral;
        fiatEscrow = _fiatEscrow;
        processor = _processor;
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
     * @param _referrer the address of the user who made this referral
     */
    function purchase(
        uint256 _quantity,
        IPay.Payment memory _payment,
        address payable _referrer
    ) public returns (uint256 purchaseID) {
        return purchaseFor(msg.sender, _quantity, _payment, _referrer);
    }

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
        IPay.Payment memory _payment,
        address payable _referrer
    ) public returns (uint256 purchaseID) {

        require(!paused, "GU:S1:Product: must be unpaused");
        require(saleCap == 0 || saleCap >= sold + _quantity, "GU:S1:Product: product cap has been exhausted");
        require(maxQuantity == 0 || _quantity < maxQuantity, "GU:S1:Product: exceeds product max quantity");
        require(_recipient != address(0), "GU:S1:Product: must be a valid recipient");
        require(_quantity > 0, "GU:S1:Product: must be a valid quantity");

        uint totalPrice = price.mul(_quantity);

        IPay.Order memory order = IPay.Order({
            currency: IPay.Currency.USDCents,
            totalPrice: totalPrice,
            sku: sku,
            quantity: _quantity,
            recipient: _recipient
        });

        uint valueToSend = 0;
        // if the user is paying in ETH, we can pay affiliate fees instantly!
        if (_payment.currency == IPay.Currency.ETH) {
            if (_referrer != address(0)) {
                uint toReferrer;
                (totalPrice, toReferrer) = referral.getSplit(_recipient, totalPrice, _referrer);
                _referrer.transfer(toReferrer);
            }
            valueToSend = totalPrice;
        }
        sold += _quantity;

        uint256 paymentID = processor.process.value(valueToSend)(order, _payment);
        purchaseID = purchaseCount++;
        emit ProductPurchased(purchaseID, paymentID);

        return purchaseID;
    }

    /** @dev Returns whether this asset is still available */
    function available() public view returns (bool) {
        if (saleCap == 0) {
            return true;
        }
        return saleCap > sold;
    }


}