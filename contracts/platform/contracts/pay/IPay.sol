pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

contract IPay {

    enum Currency {
        ETH,
        USDCents,
        Token
    }

    struct Order {
        bytes32 sku;
        uint256 quantity;
        Currency currency;
        uint256 amount;
        address token;
    }

    struct Payment {
        Currency currency;
        address token;
        uint256 maxToken;
        SignedReceipt receipt;
    }

    struct ReceiptDetails {
        address seller;
        bytes32 sku;
        uint256 quantity;
        uint64 requiredEscrowPeriod;
        uint256 value;
        Currency currency;
    }

    struct SignedReceipt {
        ReceiptDetails details;
        uint256 nonce;
        bytes32 r;
        bytes32 s;
        uint8 v;
    }

    struct Limit {
        uint256 periodEnd;
        uint256 limit;
        uint256 processed;
    }

    function process(Order memory order, Payment memory payment) public payable returns (uint);

}