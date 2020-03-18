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

    struct Callback {
        address to;
        bytes data;
    }

    Vault[] public vaults;

    function commitEscrow(Vault memory vault, address callbackTo, bytes memory callbackData) public {
        uint256 vaultID = vaults.push(vault);
        require(_ownsNone(vaultID), "must own none of the tokens");
        // solium-disable-next-line security/no-low-level-calls
        callbackTo.call(callbackData);
        require(_ownsAll(vaultID), "must now own all tokens");
    }


    function escrow(Vault memory vault, address from, bool alreadyTransferred) public returns (uint256 vaultID) {
        // vaultID = vaults.push(vault);
        // _escrow(vaultID, from, alreadyTransferred);
        // return vaultID;
        return 0;
    }

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