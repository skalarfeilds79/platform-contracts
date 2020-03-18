pragma solidity 0.5.11;

import "@openzeppelin/contracts/ownership/Ownable.sol";

contract ERC721Escrow is Ownable {

    mapping(address => bool) public singleTxEnabled;

    function setSingleTxEnabled(address user, bool enabled) external onlyOwner {
        singleTxEnabled[user] = enabled;
    }

    function _transfer(uint256 vaultID, address from, address to) internal;
    function _areAssetsEscrowed(uint256 vaultID) internal view returns (bool);

    function _escrow(uint256 vaultID, address from, bool alreadyTransferred) internal {
        if (alreadyTransferred) {
            require(_areAssetsEscrowed(vaultID), "assets must be escrowed already");
        } else {
            _transfer(vaultID, from, address(this));
        }
    }

    function _release(uint256 vaultID, address to) internal {
        _transfer(vaultID, address(this), to);
    }

}