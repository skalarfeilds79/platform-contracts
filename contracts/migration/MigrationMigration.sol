pragma solidity 0.5.11;

import "../ICards.sol";

contract MigrationMigration {

    uint public batchIndex;
    ICards public oldCards;
    ICards public newCards;

    constructor(ICards _oldCards, ICards _newCards) public {
        oldCards = _oldCards;
        newCards = _newCards;
    }

    event Migrated(uint batchIndex, uint startID);

    function migrate() public {

        (uint48 userID, uint16 size) = oldCards.batches(batchIndex * 1251);
        require(size > 0, "must be cards in this batch");
        uint16[] memory protos = new uint16[](size);
        uint8[] memory qualities = new uint8[](size);
        uint startID = batchIndex * 1251;
        
        for (uint i = 0; i < size; i++) {
            (protos[i], qualities[i]) = oldCards.getDetails(startID + i);
        }
        address user = oldCards.userIDToAddress(userID);
        newCards.mintCards(user, protos, qualities);
        emit Migrated(batchIndex, startID);
        batchIndex++;
    }

}