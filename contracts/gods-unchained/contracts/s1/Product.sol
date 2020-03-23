pragma solidity 0.5.11;

import "./referral/IReferral.sol";
import "@imtbl/platform/contracts/escrow/ICreditCardEscrow.sol";
import "@imtbl/platform/contracts/pay/IProcessor.sol";

contract Product {

    event ProductPurchased(
        uint256 indexed saleID, address indexed user,
        address indexed referrer, uint qty,
        Processor.PaymentType paymentType
    );

    using SafeMath for uint256;

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
    ICreditCardEscrow escrow;
    // Payment processor
    IProcessor processor;

    constructor(
        bytes32 _sku, uint256 _saleCap, uint _price,
        IReferral _referral, ICreditCardEscrow _escrow, IProcessor _processor
    ) public {
        sku = _sku;
        saleCap = _saleCap;
        price = _price;
        referral = _referral;
        escrow = _escrow;
        processor = _processor;
    }

    function purchase(uint256 qty, Processor.Payment memory payment, address referrer) public {
        purchaseFor(msg.sender, qty, payment, referrer);
    }

    function purchaseFor(address user, uint256 qty, Processor.Payment memory payment, address payable referrer) public {
        require(saleCap == 0 || saleCap >= sold + qty, "cap has been exhausted");
        uint totalPrice = price.mul(qty);
        // if the user is paying in ETH, we can pay affiliate fees instantly!
        if (payment.type == Processor.PaymentType.ETH && referrer != address(0)) {
            (totalPrice, uint toReferrer) = referral.getSplit(msg.sender, totalPrice, referrer);
            referrer.transfer(toReferrer);
        }
        uint256 saleID = processor.process(sku, qty, totalPrice, payment);
        sold += qty;

        emit ProductPurchased(saleID, user, referrer, qty, payment.type);
    }

    function available() public {
        return saleCap > sold;
    }


}