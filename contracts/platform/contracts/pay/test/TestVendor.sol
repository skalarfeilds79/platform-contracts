pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../IPurchaseProcessor.sol";

contract TestVendor {

    IPurchaseProcessor pay;

    constructor(IPurchaseProcessor _pay) public {
        pay = _pay;
    }

    function processPayment(IPurchaseProcessor.Order memory order, IPurchaseProcessor.PaymentParams memory payment) public payable {
        pay.process.value(msg.value)(order, payment);
    }

}