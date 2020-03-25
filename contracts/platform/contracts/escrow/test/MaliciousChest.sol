pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../IERC20Escrow.sol";
import "./TestERC20Token.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MaliciousChest {

    IERC20Escrow escrow;
    TestERC20Token asset;

    constructor(IERC20Escrow _escrow, TestERC20Token _asset) public {
        escrow = _escrow;
        asset = _asset;
    }

    function maliciousPush(uint256 count) public {

        IERC20Escrow.Vault memory vault = _createVault(count);

        bytes memory data = abi.encodeWithSignature("pushAttackHook(uint256)", count);

        escrow.callbackEscrow(vault, address(this), data);
    }

    function maliciousPull(uint256 count) public {

        IERC20Escrow.Vault memory vault = _createVault(count);

        bytes memory data = abi.encodeWithSignature("pullAttackHook(uint256)", count);

        escrow.callbackEscrow(vault, address(this), data);
    }

    function pushAttackHook(uint256 count) public {
        require(msg.sender == address(escrow), "must be the escrow contract");

        IERC20Escrow.Vault memory vault = _createVault(count);

        bytes memory data = abi.encodeWithSignature("emptyHook()");

        escrow.callbackEscrow(vault, address(this), data);

        asset.mint(address(escrow), count);

    }

    function emptyHook() public {
        require(msg.sender == address(escrow), "must be the escrow contract");
    }

    function pullAttackHook(uint256 count) public {
        require(msg.sender == address(escrow), "must be the escrow contract");

        IERC20Escrow.Vault memory vault = _createVault(count);

        asset.mint(address(this), count);
        asset.approve(address(escrow), 2**256-1);

        escrow.escrow(vault, address(this));
    }

    function _createVault(uint256 count) internal returns (IERC20Escrow.Vault memory) {
        return IERC20Escrow.Vault({
            player: msg.sender,
            releaser: msg.sender,
            asset: asset,
            balance: count
        });
    }

}