pragma solidity 0.5.11;

contract ChimeraMigration {

    // Keep track of migrated and claimed chimeras
    mapping (uint => bool) hasMigrated;

    /**
     * @dev Migrate Chimeras from the old Cards contract to the new one.
     */
    function migrate(
        uint _tokenId
    ) public {}
}