pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../token/BatchTransfer.sol";
import "../token/ListTransfer.sol";

contract ERC721Escrow is Ownable {

    struct Vault {
        address player;
        address releaser;
        IERC721 asset;
        uint256 lowTokenID;
        uint256 highTokenID;
        uint256[] tokenIDs;
    }

    // Whether an asset supports batch transfer
    mapping(address => bool) public supportsBatchTransfer;
    // Whether an asset supports list transfer
    mapping(address => bool) public supportsListTransfer;
    // All ERC721 vaults in this contract
    Vault[] public vaults;

    function setAssetStatus(address asset, bool supportsBatch, bool supportsList) external onlyOwner {
        supportsBatchTransfer[asset] = supportsBatch;
        supportsListTransfer[asset] = supportsList;
    }

    function escrow(Vault calldata vault, address currentOwner, bool alreadyTransferred) external returns (uint256) {

        require(vault.releaser != address(0), "releaser must be set");

        if (vault.tokenIDs.length > 0) {
            _escrowList(vault, currentOwner, alreadyTransferred);
        } else {
            _escrowBatch(vault, currentOwner, alreadyTransferred);
        }

        return vaults.push(vault) - 1;
    }

    function release(uint256 id, address to) external {

        Vault memory vault = vaults[id];

        if (vault.tokenIDs.length > 0) {
            _releaseList(vault, to);
        } else {
            _releaseBatch(vault, to);
        }
        delete vaults[id];
    }


    function _escrowBatch(Vault memory vault, address currentOwner, bool alreadyTransferred) internal {
        require(vault.tokenIDs.length == 0, "must have no token ID list");

        if (alreadyTransferred) {
            require(_ownsBatchInVault(vault, address(this)), "not all assets have been transferred");
        } else {
            _transferBatchInVault(vault, currentOwner, address(this));
        }

    }

    function _escrowList(Vault memory vault, address currentOwner, bool alreadyTransferred) internal {
        require(vault.lowTokenID == 0 && vault.highTokenID == 0, "must have no high/low token IDs");

        if (alreadyTransferred) {
            require(_ownsListInVault(vault, address(this)), "not all assets have been transferred");
        } else {
            _transferListInVault(vault, currentOwner, address(this));
        }
    }

    function _releaseBatch(Vault memory vault, address to) internal {
        _transferBatchInVault(vault, address(this), to);
    }

    function _releaseList(Vault memory vault, address to) internal {
        _transferListInVault(vault, address(this), to);
    }

    function _transferBatchInVault(Vault memory vault, address from, address to) internal {
        if (supportsBatchTransfer[address(vault.asset)]) {
            BatchTransfer(address(vault.asset)).transferBatch(from, to, vault.lowTokenID, vault.highTokenID);
        } else {
            for (uint i = vault.lowTokenID; i < vault.highTokenID; i++) {
                vault.asset.transferFrom(from, to, i);
            }
        }
    }

    function _transferListInVault(Vault memory vault, address from, address to) internal {
        if (supportsListTransfer[address(vault.asset)]) {
            ListTransfer(address(vault.asset)).transferAllFrom(from, to, vault.tokenIDs);
        } else {
            for (uint i = 0; i < vault.tokenIDs.length; i++) {
                vault.asset.transferFrom(from, to, vault.tokenIDs[i]);
            }
        }
    }

    function _ownsBatchInVault(Vault memory vault, address owner) internal view returns (bool) {
        for (uint i = vault.lowTokenID; i < vault.highTokenID; i++) {
            if (vault.asset.ownerOf(i) != owner) {
                return false;
            }
        }
        return true;
    }

    function _ownsListInVault(Vault memory vault, address owner) internal view returns (bool) {
        for (uint i = 0; i < vault.tokenIDs.length; i++) {
            if (vault.asset.ownerOf(vault.tokenIDs[i]) != owner) {
                return false;
            }
        }
        return true;
    }

}