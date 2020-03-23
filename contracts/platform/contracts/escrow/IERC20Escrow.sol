pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "./ERC20Escrow.sol";

contract IERC20Escrow {

    /**
     * @dev Create a new escrow vault
     *
     * @param vault the escrow vault to be created
     * @param from the ownr of the assets
     */
    function escrow(ERC20Escrow.Vault memory vault, address from) public returns (uint256 vaultID);

    function release(uint256 vaultID, address to) public;

}