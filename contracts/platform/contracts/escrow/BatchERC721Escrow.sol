pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../token/BatchTransfer.sol";
import "./ERC721Escrow.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract BatchERC721Escrow is ERC721Escrow {

    struct Vault {
        address player;
        address releaser;
        IERC721 asset;
        uint256 lowTokenID;
        uint256 highTokenID;
    }

    Vault[] public vaults;

    /**
     * @dev Create an escrow account where assets will be pushed into escrow by another contract
     *
     * @param vault the details of the new escrow vault
     * @param callbackTo the address to use for the callback transaction
     * @param callbackData the data to pass to the callback transaction
     */
    function callbackEscrow(Vault memory vault, address callbackTo, bytes memory callbackData) public returns (uint256 vaultID) {
        vaultID = vaults.push(vault);
        _callbackEscrow(vaultID, callbackTo, callbackData);
        return vaultID;
    }

    /**
     * @dev Create an escrow account where assets will be pulled into escrow by this contract
     *
     * @param vault the details of the new escrow vault
     * @param from the current owner of the assets to be escrowed
     */
    function escrow(Vault memory vault, address from) public returns (uint256 vaultID) {
        vaultID = vaults.push(vault);
        _escrow(vaultID, from);
        return vaultID;
    }

    /**
     * @dev Release assets from an escrow account
     *
     * @param vaultID the id of the escrow vault
     * @param to the address to which assets should be released
     */
    function release(uint256 vaultID, address to) external {
        _release(vaultID, to);
        delete vaults[vaultID];
    }

    function _transfer(uint256 vaultID, address from, address to) internal {
        Vault memory vault = vaults[vaultID];
        if (singleTxEnabled[address(vault.asset)]) {
            BatchTransfer(address(vault.asset)).transferBatch(from, to, vault.lowTokenID, vault.highTokenID);
        } else {
            for (uint i = vault.lowTokenID; i < vault.highTokenID; i++) {
                vault.asset.transferFrom(from, to, i);
            }
        }
    }

    function _areAnyAssetsEscrowed(uint256 vaultID) internal view returns (bool) {
        Vault memory vault = vaults[vaultID];
        for (uint i = vault.lowTokenID; i < vault.highTokenID; i++) {
            if (vault.asset.ownerOf(i) == address(this)) {
                return true
            }
        }
        return false;
    }

    function _areAssetsEscrowed(uint256 vaultID) internal view returns (bool) {
        Vault memory vault = vaults[vaultID];
        for (uint i = vault.lowTokenID; i < vault.highTokenID; i++) {
            if (vault.asset.ownerOf(i) != address(this)) {
                return false;
            }
        }
        return true;
    }
}