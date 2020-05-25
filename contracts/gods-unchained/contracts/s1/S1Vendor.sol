pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "./referral/IReferral.sol";
import "./S1Cap.sol";
import "@imtbl/platform/contracts/escrow/releaser/CreditCardEscrow.sol";
import "@imtbl/platform/contracts/pay/PurchaseProcessor.sol";
import "@imtbl/platform/contracts/pay/vendor/IVendor.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/lifecycle/Pausable.sol";

contract S1Vendor is IVendor, Pausable, Ownable {

    using SafeMath for uint256;

    event PurchaseReferred(
        uint256 indexed paymentID,
        address indexed referrer,
        uint256 referralFeeUSD,
        uint256 referralFeeETH
    );

    // Referral contract
    IReferral public referral;
    // Price of each product sold by this contract
    uint256 public price;
    // SKU of the product sold by this contract
    bytes32 public sku;
    // Escrow contract
    CreditCardEscrow public escrow;
    // Payment processor
    PurchaseProcessor public pay;
    // Cap tracker
    S1Cap cap;

    constructor(
        S1Cap _cap,
        IReferral _referral,
        bytes32 _sku,
        uint256 _price,
        CreditCardEscrow _escrow,
        PurchaseProcessor _pay
    ) public {
        sku = _sku;
        price = _price;
        escrow = _escrow;
        pay = _pay;
        referral = _referral;
        cap = _cap;
    }

    /** @dev Purchase assets
     *
     * @param _quantity the number of this product to purchase
     * @param _payment the details of the method by which payment will be made
     * @param _referrer the address of the user who made this referral
     */
    function purchase(
        uint256 _quantity,
        PurchaseProcessor.PaymentParams memory _payment,
        address payable _referrer
    ) public payable returns (PurchaseProcessor.Receipt memory) {
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
        PurchaseProcessor.PaymentParams memory _payment,
        address payable _referrer
    ) public payable returns (PurchaseProcessor.Receipt memory) {

        uint256 totalPrice = _quantity.mul(price);

        uint256 toReferrer = 0;

        if (_referrer != address(0)) {
            (, toReferrer) = referral.getSplit(_recipient, totalPrice, _referrer);
        }

        PurchaseProcessor.Order memory order = PurchaseProcessor.Order({
            currency: PurchaseProcessor.Currency.USDCents,
            totalPrice: totalPrice,
            alreadyPaid: _payment.currency == PurchaseProcessor.Currency.ETH ? toReferrer : 0,
            sku: sku,
            quantity: _quantity,
            assetRecipient: _recipient,
            changeRecipient: address(uint160(address(this)))
        });

        PurchaseProcessor.Receipt memory receipt = pay.process.value(msg.value)(order, _payment);

        // if the user is paying in ETH, we can pay affiliate fees instantly!
        if (_referrer != address(0)) {
            uint256 payoutAmount = 0;
            if (_payment.currency == PurchaseProcessor.Currency.ETH) {
                payoutAmount = pay.convertUSDToETH(toReferrer);
                // solium-disable-next-line
                _referrer.call.value(payoutAmount)("");
            }
            emit PurchaseReferred(receipt.id, _referrer, toReferrer, payoutAmount);
        }

        if (address(this).balance > 0) {
            // send remaining funds to original contract/user
            // solium-disable-next-line
            msg.sender.call.value(address(this).balance)("");
        }

        cap.update(totalPrice);

        return receipt;
    }

    function () external payable {

    }

}