pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../IReleasable.sol";
import "../IBatchERC721Escrow.sol";
import "../IListERC721Escrow.sol";
import "../IERC20Escrow.sol";

contract ICreditCardEscrow {

    /**
     * @dev Release all assets from an escrow account
     *
     * @param _id The ID of the escrow account to be released
     */
    function release(IReleasable _escrow, uint _id) public;

    /**
     * @dev Request that a custodial escrow account's assets be marked for release
     *
     * @param _id The ID of the escrow account to be marked
     */
    function requestRelease(address _escrow, uint _id) public;

    /**
     * @dev Cancel a release request
     *
     * @param _id The ID of the escrow account to be unmarked
     */
    function cancelRelease(address _escrow, uint _id) public;

    /**
     * @dev Request that an escrow account's assets be marked for destruction
     *
     * @param _id The ID of the escrow account to be marked
     */
    function requestDestruction(address _escrow, uint _id) public;

    /**
     * @dev Revoke a destruction request
     *
     * @param _id The ID of the escrow account to be unmarked
     */
    function cancelDestruction(address _escrow, uint _id) public;

    /**
     * @dev Destroy all assets in an escrow account
     *
     * @param _id The ID of the escrow account to be destroyed
     */
    function destroy(address _escrow, uint _id) public;

    function escrowERC20(
        IERC20Escrow.Vault memory vault, address cbTo, bytes memory cbData, uint64 _duration
    ) public returns (uint);

    function escrowBatch(
        IBatchERC721Escrow.Vault memory vault, address cbTo, bytes memory cbData, uint64 _duration
    ) public returns (uint);

    function getERC20Escrow() public view returns (IERC20Escrow);
    function getBatchEscrow() public view returns (IBatchERC721Escrow);

}