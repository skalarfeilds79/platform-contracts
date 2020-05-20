pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../IEscrow.sol";

contract ICreditCardEscrow {

    /**
     * @dev Release all assets from an escrow account
     *
     * @param _id The ID of the escrow account to be released
     */
    function release(uint _id) external;

    /**
     * @dev Request that a custodial escrow account's assets be marked for release
     *
     * @param _id The ID of the escrow account to be marked
     * @param _to The new owner of tese assets
     */
    function requestRelease(uint _id, address _to) external;

    /**
     * @dev Cancel a release request
     *
     * @param _id The ID of the escrow account to be unmarked
     */
    function cancelRelease(uint _id) external;

    /**
     * @dev Request that an escrow account's assets be marked for destruction
     *
     * @param _id The ID of the escrow account to be marked
     */
    function requestDestruction(uint _id) external;

    /**
     * @dev Revoke a destruction request
     *
     * @param _id The ID of the escrow account to be unmarked
     */
    function cancelDestruction(uint _id) external;

    /**
     * @dev Destroy all assets in an escrow account
     *
     * @param _id The ID of the escrow account to be destroyed
     */
    function destroy(uint _id) external;

    /**
     * @dev Create a new escrow account
     *
     * @param _vault The vault details of this escrow
     * @param _callbackTo The address on which to callback
     * @param _callbackData The data to pass to the callback function
     * @param _paymentID The ID of the payment
     * @param _duration The duration of the escrow
     */
    function callbackEscrow(
        IEscrow.Vault calldata _vault,
        address _callbackTo,
        bytes calldata _callbackData,
        uint256 _paymentID,
        uint256 _duration
    ) external returns (uint);

    function getProtocol() external view returns (IEscrow);
}