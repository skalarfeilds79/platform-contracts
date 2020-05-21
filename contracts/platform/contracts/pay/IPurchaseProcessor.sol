pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

contract IPurchaseProcessor {

    enum Currency {
        ETH,
        USDCents
    }

    struct Order {
        address payable changeRecipient;
        address assetRecipient;
        bytes32 sku;
        uint256 quantity;
        Currency currency;
        uint256 totalPrice;
        uint256 alreadyPaid;
    }

    struct PaymentParams {
        Currency currency;
        uint256 value;
        uint256 nonce;
        bytes32 r;
        bytes32 s;
        uint8 v;
        uint256 escrowFor;
    }

    struct Receipt {
        uint256 id;
        Currency currency;
        uint256 amount;
    }

    struct Limit {
        uint256 periodEnd;
        uint256 total;
        uint256 used;
    }

    function process(
        Order memory order,
        PaymentParams memory payment
    ) public payable returns (Receipt memory);

    function convertUSDToETH(uint256 usdCents) public view returns (uint256 eth);

}