pragma solidity 0.5.11;

pragma experimental ABIEncoderV2;

import "@0x/contracts-exchange-libs/contracts/src/LibFillResults.sol";
import "@0x/contracts-exchange-libs/contracts/src/LibOrder.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "./interfaces/IExchange.sol";
import "./interfaces/IEtherToken.sol";

import "./util/LibBytes.sol";
import "./util/LibRichErrors.sol";

contract Forwarder is LibOrder {

    using LibBytes for bytes;

    address public ZERO_EX_EXCHANGE;
    address public ZERO_EX_TOKEN_PROXY;

    address payable public ETHER_TOKEN;

    constructor(
        address zeroExExchange,
        address zeroExProxy,
        address payable etherToken
    )
        public
    {
        ZERO_EX_EXCHANGE = zeroExExchange;
        ZERO_EX_TOKEN_PROXY = zeroExProxy;
        ETHER_TOKEN = etherToken;

        // Set allowance once rather than every call to save gas
        IEtherToken(ETHER_TOKEN).approve(ZERO_EX_TOKEN_PROXY, (2**256)-1);
    }

    function fillOrders(
        LibOrder.Order[] memory orders,
        uint256[] memory takerAssetFillAmounts,
        bytes[] memory signatures
    )
        public
        payable
    {
        // Instantiate implementations of interfaces
        IEtherToken token = IEtherToken(ETHER_TOKEN);
        IExchange v2Exchange = IExchange(ZERO_EX_EXCHANGE);

        token.deposit.value(msg.value)();

        // We're filling each order individually because some might be filled by the time
        // the transaction settles on-chain
        for (uint i = 0; i < orders.length; i++) {
            LibFillResults.FillResults memory result = v2Exchange.fillOrderNoThrow(
                orders[i],
                takerAssetFillAmounts[i],
                signatures[i]
            );

            // Some 0x inline assembly magic to avoid passing tokenIDs as an argument
            (address cardToken, uint256 tokenId) = abi.decode(
                orders[i].makerAssetData.sliceDestructive(
                    4,
                    orders[i].makerAssetData.length
                ),
                (address, uint256)
            );

            // If the result = requested amount, transfer to user's wallet
            if (result.takerAssetFilledAmount == takerAssetFillAmounts[i]) {
                IERC721(cardToken).transferFrom(address(this), msg.sender, tokenId);
            }
        }

        uint remainingBalance = token.balanceOf(address(this));
        token.withdraw(remainingBalance);

        // Transfer all remaining funds back to user
        address(msg.sender).transfer(remainingBalance);

        // Ensure the contract never holds any ETH
        require(
            address(this).balance == 0,
            "Forwarder: must have zero ETH at the end"
        );

    }

    function ()
        external
        payable
    {
        require(
            msg.sender == address(ETHER_TOKEN),
            "Forwarder: will not accept ETH from only ether token address"
        );
    }

}