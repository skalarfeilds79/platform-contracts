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
     * @param callbackTo the address to use for the callback transaction
     * @param callbackData the data to pass to the callback transaction
     */
    function callbackEscrow(
        Vault memory vault, address callbackTo, bytes memory callbackData
    ) public returns (uint256 vaultID);

    /**
     * @dev Create a new escrow vault
     *
     * @param vault the escrow vault to be created
     * @param from the address from which to pull the tokens
     */
    function escrow(Vault memory vault, address from) public returns (uint256 vaultID);

    function release(uint256 vaultID, address to) public;

}