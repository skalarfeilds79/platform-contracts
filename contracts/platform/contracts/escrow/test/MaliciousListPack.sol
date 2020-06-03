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
    uint256 purchaseID;
    bool pushing;
    bool pulling;

    constructor(Escrow _escrow, TestERC721Token _asset) public {
        escrow = _escrow;
        asset = _asset;
    }

    function maliciousPush(uint256 count) external {
        Escrow.Vault memory vault = _createVault(count);
        purchaseID = purchases.push(Purchase({
            count: count
        })) - 1;
        escrow.escrow(vault);
        pushing = true;
    }

    function maliciousPull(uint256 count) external {
        Escrow.Vault memory vault = _createVault(count);
        purchaseID = purchases.push(Purchase({
            count: count
        })) - 1;
        escrow.escrow(vault);
        pulling = true;
    }

    function onEscrowCallback() external returns (bytes4) {
        require(msg.sender == address(escrow), "must be the escrow contract");
        if (pushing) {
            uint256 count = purchases[purchaseID].count;
            delete purchases[purchaseID];
            Escrow.Vault memory vault = _createVault(count);
            escrow.escrow(vault);
            asset.mint(address(escrow), count);
            pushing = false;
        } else if (pulling) {
            uint256 count = purchases[purchaseID].count;
            delete purchases[purchaseID];
            Escrow.Vault memory vault = _createVault(count);
            asset.mint(address(this), count);
            asset.setApprovalForAll(address(escrow), true);
            escrow.escrow(vault);
            pulling = false;
        }
        return bytes4(keccak256("Immutable Escrow Callback"));
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