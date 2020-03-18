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

    Vault[] public vaults;

    function escrow(Vault memory vault, address from, bool alreadyTransferred) public returns (uint256 vaultID) {
        vaultID = vaults.push(vault);
        _escrow(vaultID, from, alreadyTransferred);
        return vaultID;
    }

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

    function _areAssetsEscrowed(uint256 vaultID) internal view returns (bool) {
        Vault memory vault = vaults[vaultID];
        for (uint i = 0; i < vault.tokenIDs.length; i++) {
            if (vault.asset.ownerOf(vault.tokenIDs[i]) != address(this)) {
                return false;
            }
        }
        return true;
    }

}