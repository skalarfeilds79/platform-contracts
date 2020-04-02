pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "./referral/IReferral.sol";
import "@imtbl/platform/contracts/escrow/releaser/ICreditCardEscrow.sol";
import "@imtbl/platform/contracts/pay/IPay.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract Product {

    using SafeMath for uint256;

    event ProductPurchased(uint256 indexed paymentID, uint256 indexed saleID);
    event ProductEscrowed(uint256 indexed saleID, address indexed escrow, uint256 indexed escrowID);

    // Total number of this product which this contract can sell
    uint256 saleCap;
    // Total number of this product sold by this contract
    uint256 sold;
    // Price of each product sold by this contract
    uint256 price;
    // SKU of the product sold by this contract
    bytes32 sku;
    // Referral contract
    IReferral referral;
    // Escrow contract
    ICreditCardEscrow fiatEscrow;
    // Payment processor
    IPay processor;

    constructor(
        bytes32 _sku, uint256 _saleCap, uint _price,
        IReferral _referral, ICreditCardEscrow _fiatEscrow,
        IPay _processor
    ) public {
        sku = _sku;
        saleCap = _saleCap;
        price = _price;
        referral = _referral;
        fiatEscrow = _fiatEscrow;
        processor = _processor;
    }

    function purchase(uint256 qty, address payable referrer, IPay.Payment memory payment) public {
        purchaseFor(msg.sender, qty, referrer, payment);
    }

    function purchaseFor(
        address user, uint256 qty, address payable referrer, IPay.Payment memory payment
    ) public {
        require(saleCap == 0 || saleCap >= sold + qty, "cap has been exhausted");
        uint totalPrice = price.mul(qty);

        IPay.Order memory order = IPay.Order({
            currency: IPay.Currency.USDCents,
            amount: totalPrice,
            sku: sku,
            quantity: qty,
            user: user
        });

        uint valueToSend = 0;
        // if the user is paying in ETH, we can pay affiliate fees instantly!
        if (payment.currency == IPay.Currency.ETH) {
            if (referrer != address(0)) {
                uint toReferrer;
                (totalPrice, toReferrer) = referral.getSplit(msg.sender, totalPrice, referrer);
                referrer.transfer(toReferrer);
            }
            valueToSend = totalPrice;
        }
        processor.process.value(valueToSend)(order, payment);
        sold += qty;
    }

    function available() public view returns (bool) {
        return saleCap > sold;
    }


}