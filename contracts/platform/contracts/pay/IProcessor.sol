pragma solidity 0.5.11;

contract IProcessor {

    enum Currency {
        ETH, Token, Fiat
    }

    struct Limit {
        uint256 periodEnd;
        uint64 limit;
        uint64 processed;
    }

    struct Payment {
        Currency currency;
        bytes32 receiptHash;
        uint64 usdCents;
    }

    function process(bytes32 sku, uint quantity, uint totalPrice, Payment memory payment) public returns (uint);

}