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

    function maliciousPush(uint256 _count) external {

        Escrow.Vault memory vault = _createVault(_count);

        escrow.escrow(vault);
    }

    bool first = false;
    uint count;

    function onEscrowCallback() external returns (bytes4) {
        require(msg.sender == address(escrow), "must be the escrow contract");
        if (first) {
            Escrow.Vault memory vault = _createVault(count);
            escrow.escrow(vault);
            asset.mint(address(escrow), count);
            first = true;
        }
        return bytes4(keccak256("Immutable Escrow Callback"));
    }

    function _createVault(uint256 _count) internal view returns (Escrow.Vault memory) {
        return Escrow.Vault({
            player: msg.sender,
            admin: msg.sender,
            asset: address(asset),
            balance: _count,
            lowTokenID: 0,
            highTokenID: 0,
            tokenIDs: new uint256[](0)
        });
    }

}