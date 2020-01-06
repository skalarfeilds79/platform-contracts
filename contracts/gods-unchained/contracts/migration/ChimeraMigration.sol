pragma solidity 0.5.11;

contract ChimeraMigration {

    // Keep track of migrated and claimed chimeras
    mapping (uint => bool) hasMigrated;

    /**
     * @dev If a user has not claimed a Chimera, they can do so through this method.
     * It will also migrate the card to the new Cards contract after claiming.
     *
     * @param _tokenId The id of the Chimera token to claim
     * @param _authority Immutable controlled wallet that provided the code
     * @param _signature Hash of the claim the user has received
     */
    function claimAndMigrate(
        uint _tokenId,
        address _authority,
        bytes memory _signature
    ) public {}

    /**
     * @dev Migrate Chimeras from the old Cards contract to the new one.
     */
    function migrate(
        uint _tokenId
    ) public {}
}