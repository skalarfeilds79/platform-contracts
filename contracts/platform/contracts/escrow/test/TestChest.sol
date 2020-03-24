pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../IERC20Escrow.sol";
import "./TestERC20Token.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TestChest {

    IERC20Escrow escrow;
    TestERC20Token asset;

    constructor(IERC20Escrow _escrow, TestERC20Token _asset) public {
        escrow = _escrow;
        asset = _asset;
    }

    function purchase(uint256 count) public {

        IERC20Escrow.Vault memory vault = IERC20Escrow.Vault({
            player: msg.sender,
            releaser: msg.sender,
            asset: asset,
            balance: count
        });

        bytes memory data = abi.encodeWithSignature("escrowHook(uint256)", count);

        escrow.callbackEscrow(vault, address(this), data);
    }

    function escrowHook(uint256 count) public {
        require(msg.sender == address(escrow), "must be the escrow contract");
        asset.mint(address(escrow), count);
    }

}