pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../Escrow.sol";
import "./TestERC721Token.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract MaliciousListPack {

    struct Purchase {
        uint256 count;
    }

    Purchase[] public purchases;
    Escrow escrow;
    TestERC721Token asset;

    constructor(Escrow _escrow, TestERC721Token _asset) public {
        escrow = _escrow;
        asset = _asset;
    }

    function maliciousPush(uint256 count) external {

        Escrow.Vault memory vault = _createVault(count);

        uint256 id = purchases.push(Purchase({
            count: count
        })) - 1;

        bytes memory data = abi.encodeWithSignature("pushAttackHook(uint256)", id);

        escrow.callbackEscrow(vault, data);
    }

    function maliciousPull(uint256 count) external {

        Escrow.Vault memory vault = _createVault(count);

        uint256 id = purchases.push(Purchase({
            count: count
        })) - 1;

        bytes memory data = abi.encodeWithSignature("pullAttackHook(uint256)", id);

        escrow.callbackEscrow(vault, data);
    }

    function pushAttackHook(uint256 purchaseID) external {
        require(msg.sender == address(escrow), "must be the escrow contract");
        uint256 count = purchases[purchaseID].count;
        delete purchases[purchaseID];
        Escrow.Vault memory vault = _createVault(count);
        bytes memory data = abi.encodeWithSignature("emptyHook()");
        escrow.callbackEscrow(vault, data);
        asset.mint(address(escrow), count);
    }

    function emptyHook() external view {
        require(msg.sender == address(escrow), "must be the escrow contract");
    }

    function pullAttackHook(uint256 purchaseID) external {
        require(msg.sender == address(escrow), "must be the escrow contract");

        uint256 count = purchases[purchaseID].count;
        delete purchases[purchaseID];
        Escrow.Vault memory vault = _createVault(count);

        asset.mint(address(this), count);
        asset.setApprovalForAll(address(escrow), true);
        escrow.escrow(vault, address(this));
    }

    function _createVault(uint256 count) internal view returns (Escrow.Vault memory) {

        // predict token IDs

        uint[] memory ids = new uint[](count);
        uint start = asset.totalSupply();
        for (uint i = 0; i < count; i++) {
            ids[i] = start + i;
        }

        return Escrow.Vault({
            player: msg.sender,
            admin: msg.sender,
            asset: address(asset),
            balance: 0,
            lowTokenID: 0,
            highTokenID: 0,
            tokenIDs: ids
        });
    }

}