pragma solidity 0.5.11;

import "../ICards.sol";
import "../legacy/packs/four/IPackFour.sol";
import "./BaseMigration.sol";

contract v1MigrationOld is BaseMigration {

    ICards cards;
    uint public limit;

    constructor(
        ICards _cards,
        address[] memory _packs,
        uint _limit
    ) public {

        for (uint i = 0; i < _packs.length; i++) {
            canMigrate[_packs[i]] = true;
        }

        cards = _cards;
        limit = _limit;
    }

    mapping (address => bool) public canMigrate;

    mapping (address => mapping (uint => uint)) public v1Migrated;

    event Migrated(
        address indexed user,
        address indexed pack,
        uint indexed id,
        uint start,
        uint end,
        uint startID
    );

    function migrate(
        IPackFour pack,
        uint id
    )
        public
    {
        require(
            canMigrate[address(pack)],
            "V1: must be migrating from an approved pack"
        );

        (
            uint16 current,
            uint16 count,
            address user,
            uint256 randomness,
        ) = pack.purchases(id);

        // Check if randomness set
        require(
            randomness != 0,
            "V1: must have had randomness set"
        );


        // removed variable due to stack limit
        uint remaining = ((count - current) * 5) - v1Migrated[address(pack)][id];

        require(
            remaining > 0,
            "V1: no more cards to migrate"
        );

        if (remaining > limit) {
            remaining = limit;
        }

        uint16[] memory protos = new uint16[](remaining);
        uint16[] memory purities = new uint16[](remaining);
        uint8[] memory qualities = new uint8[](remaining);

        // // TODO: Do these need to be converted as well?
        (protos, purities) = pack.predictPacks(id);

        // Run loop which starts at local counter start of v1Migrated
        uint loopStart = (current * 5) + v1Migrated[address(pack)][id];

        // For each element, get the old card and make the
        // appropriate conversion + check not activated
        for (uint i = 0; i < remaining; i++) {
            uint x = loopStart+i;
            protos[i] = convertProto(protos[x]);
            qualities[i] = convertPurity(purities[x]);
        }

        // Batch Mint cards (details passed as function args)
        uint startID = cards.mintCards(user, protos, qualities);

        v1Migrated[address(pack)][id] += remaining;

        uint loopEnd = loopStart + remaining;

        emit Migrated(user, address(pack), id, loopStart, loopEnd, startID);
    }

}
