pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract IERC20Escrow {

    struct Vault {
        address player;
        address releaser;
        IERC20 asset;
        uint256 balance;
    }

    // Every Escrow vault tracked by this contract
    Vault[] public vaults;

    /**
     * @dev Create a new escrow vault
     *
     * @param vault the escrow vault to be created
     */
    function escrow(Vault memory vault, address from) public returns (uint256 vaultID);

    function release(uint256 vaultID, address to) public;

}