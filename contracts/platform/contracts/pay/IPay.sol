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
        uint256 qty;
        Currency currency;
        uint256 amount;
        address token;
    }

    struct Payment {
        Currency currency;
        address token;
        uint256 maxToken;
        bytes signedReceipt;
        uint64 usdCents;
    }

    struct Limit {
        uint256 periodEnd;
        uint64 limit;
        uint64 processed;
    }

    function process(Order memory order, Payment memory payment) public payable returns (uint);

}