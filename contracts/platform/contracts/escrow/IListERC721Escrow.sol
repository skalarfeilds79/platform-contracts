pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "./ListERC721Escrow.sol";

contract IListERC721Escrow {

    /**
     * @dev Create an escrow account where assets will be pushed into escrow by another contract
     *
     * @param vault the details of the new escrow vault
     * @param callbackTo the address to use for the callback transaction
     * @param callbackData the data to pass to the callback transaction
     */
    function callbackEscrow(
        ListERC721Escrow.Vault memory vault, address callbackTo, bytes memory callbackData
    ) public returns (uint256 vaultID);

    /**
     * @dev Create an escrow account where assets will be pulled into escrow by this contract
     *
     * @param vault the details of the new escrow vault
     * @param from the current owner of the assets to be escrowed
     */
    function escrow(ListERC721Escrow.Vault memory vault, address from) public returns (uint256 vaultID);

    /**
     * @dev Release assets from an escrow account
     *
     * @param vaultID the id of the escrow vault
     * @param to the address to which assets should be released
     */
    function release(uint256 vaultID, address to) external;

}