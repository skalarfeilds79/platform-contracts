pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

contract IPay {

    enum Currency {
        ETH,
        USDCents,
        Token
    }

    struct Order {
        address recipient;
        bytes32 sku;
        uint256 quantity;
        Currency currency;
        uint256 totalPrice;
    }

    struct Payment {
        Currency currency;
        uint256 value;
        uint256 nonce;
        bytes32 r;
        bytes32 s;
        uint8 v;
        uint256 escrowFor;
    }

    struct Limit {
        uint256 periodEnd;
        uint256 total;
        uint256 used;
    }

    function process(Order memory order, Payment memory payment) public payable returns (uint);

}