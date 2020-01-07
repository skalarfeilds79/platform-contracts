pragma solidity 0.5.11;

contract EtherbotsMigration {

    // Keep track of migrated cards
    mapping (uint => bool) public hasMigrated;

    /**
     * @dev Migrate Etherbot cards from the old Cards contract to the new one.
     *
     * @param _cardId The id of the Etherbots card
     */
    function migrate(
        uint _cardId
    ) public {}
}