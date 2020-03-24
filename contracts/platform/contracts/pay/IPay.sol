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

    struct SignedReceipt {
        uint256 nonce;
        uint64 usdCents;
        bytes32 signedHash;
        bytes32 r;
        bytes32 s;
        uint8 v;
    }

    struct Limit {
        uint256 periodEnd;
        uint64 limit;
        uint64 processed;
    }

    function process(Order memory order, Payment memory payment) public payable returns (uint);

}