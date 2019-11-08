pragma solidity 0.5.11;

pragma experimental ABIEncoderV2;

import "@0x/contracts-exchange-libs/contracts/src/LibOrder.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "./IExchange.sol";
import "./IEtherToken.sol";

contract Forwarder is LibOrder {

    address public ZERO_EX_EXCHANGE;

    address public ZERO_EX_TOKEN_PROXY;

    address payable public ETHER_TOKEN;

    IERC721 public CARDS_TOKEN;

    constructor(
        address zeroExExchange,
        address zeroExProxy,
        address payable etherToken,
        address cardsToken
    )
        public
    {
        ZERO_EX_EXCHANGE = zeroExExchange;
        ZERO_EX_TOKEN_PROXY = zeroExProxy;
        ETHER_TOKEN = etherToken;
        CARDS_TOKEN = IERC721(cardsToken);
    }

    function fillOrders(
        LibOrder.Order[] memory orders,
        uint256[] memory takerAssetFillAmounts,
        bytes[] memory signatures,
        uint[] memory tokenIDs
    )
        public
        payable
    {
        IEtherToken token = IEtherToken(ETHER_TOKEN);

        // address payable payableEtherToken = address(uint160(ETHER_TOKEN));
        token.deposit.value(msg.value);

        token.approve(ZERO_EX_TOKEN_PROXY, msg.value);

        IExchange v2Exchange = IExchange(ZERO_EX_EXCHANGE);

        v2Exchange.batchFillOrdersNoThrow(
            orders,
            takerAssetFillAmounts,
            signatures
        );

        for (uint i = 0; i < tokenIDs.length; i++) {
            address(CARDS_TOKEN).call(
                abi.encodePacked(
                    "transferFrom(address,address,uint256)",
                    abi.encode(address(this), msg.sender, tokenIDs[i])
                )
            );
        }

        // uint remainingBalance = token.balanceOf(address(this));
        // token.withdraw(remainingBalance);

        // address(msg.sender).transfer(remainingBalance);
        // require(address(this).balance == 0);

    }

}