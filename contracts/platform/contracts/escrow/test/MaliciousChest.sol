pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../Escrow.sol";
import "./TestERC20Token.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MaliciousChest {

    Escrow escrow;
    TestERC20Token asset;

    constructor(Escrow _escrow, TestERC20Token _asset) public {
        escrow = _escrow;
        asset = _asset;
    }

    function maliciousPush(uint256 count) external {

        Escrow.Vault memory vault = _createVault(count);

        bytes memory data = abi.encodeWithSignature("pushAttackHook(uint256)", count);

        escrow.callbackEscrow(vault, address(this), data);
    }

    function maliciousPull(uint256 count) external {

        Escrow.Vault memory vault = _createVault(count);

        bytes memory data = abi.encodeWithSignature("pullAttackHook(uint256)", count);

        escrow.callbackEscrow(vault, address(this), data);
    }

    function pushAttackHook(uint256 count) external {
        require(msg.sender == address(escrow), "must be the escrow contract");

        Escrow.Vault memory vault = _createVault(count);

        bytes memory data = abi.encodeWithSignature("emptyHook()");

        escrow.callbackEscrow(vault, address(this), data);

        asset.mint(address(escrow), count);

    }

    function emptyHook() external view {
        require(msg.sender == address(escrow), "must be the escrow contract");
    }

    function pullAttackHook(uint256 count) external {
        require(msg.sender == address(escrow), "must be the escrow contract");

        Escrow.Vault memory vault = _createVault(count);

        asset.mint(address(this), count);
        asset.approve(address(escrow), 2**256-1);

        escrow.escrow(vault, address(this));
    }

    function _createVault(uint256 count) internal view returns (Escrow.Vault memory) {
        return Escrow.Vault({
            player: msg.sender,
            admin: msg.sender,
            asset: address(asset),
            balance: count,
            lowTokenID: 0,
            highTokenID: 0,
            tokenIDs: new uint256[](0)
        });
    }

}