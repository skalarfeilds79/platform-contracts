pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../PurchaseProcessor.sol";

contract TestVendor {

    PurchaseProcessor pay;

    constructor(PurchaseProcessor _pay) public {
        pay = _pay;
    }

    function processPayment(PurchaseProcessor.Order memory order, PurchaseProcessor.PaymentParams memory payment) public payable {
        pay.process.value(msg.value)(order, payment);
    }

}