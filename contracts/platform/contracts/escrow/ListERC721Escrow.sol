pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "./ERC721Escrow.sol";
import "../token/ListTransfer.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract ListERC721Escrow is ERC721Escrow {

    struct Vault {
        address player;
        address releaser;
        IERC721 asset;
        uint256[] tokenIDs;
    }

    // List of all escrow vaults
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
            ListTransfer(address(vault.asset)).transferAllFrom(from, to, vault.tokenIDs);
        } else {
            for (uint i = 0; i < vault.tokenIDs.length; i++) {
                vault.asset.transferFrom(from, to, vault.tokenIDs[i]);
            }
        }
    }

    function _areAnyAssetsEscrowed(uint256 vaultID) internal view returns (bool) {
        Vault memory vault = vaults[vaultID];
        for (uint i = 0; i < vault.tokenIDs.length; i++) {
            if (vault.asset.ownerOf(vault.tokenIDs[i]) == address(this)) {
                return true;
            }
        }
        return false;
    }

    function _areAllAssetsEscrowed(uint256 vaultID) internal view returns (bool) {
        Vault memory vault = vaults[vaultID];
        for (uint i = 0; i < vault.tokenIDs.length; i++) {
            if (vault.asset.ownerOf(vault.tokenIDs[i]) != address(this)) {
                return false;
            }
        }
        return true;
    }

}