pragma solidity 0.5.11;

import "../ICards.sol";
import "../legacy/packs/four/IPackFour.sol";
import "./BaseMigration.sol";

contract v1Migration is BaseMigration {

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

    mapping (address => mapping (uint => uint)) v1Migrated;

    event Migrated(
        address indexed user,
        uint id,
        uint start,
        uint end
    );

    function migrate(
        IPackFour pack,
        uint id
    )
        public
        returns (uint start, uint end)
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

        uint size = (count - current) * 5;
        require(
            v1Migrated[address(pack)][id] < (current * 5),
            "V1: no more cards to migrate"
        );

        // If the size is greater than the limit, bound it.
        // Don't want to throw as we don't know what packs will be large
        // but also resuming won't be possible.
        if (size > limit) {
            size = limit;
        }

        uint16[] memory protos;
        uint16[] memory purities;
        uint8[] memory qualities;

        // TODO: Do these need to be converted as well?
        (protos, purities) = pack.predictPacks(id);

        // TODO: what if size is > blocksize/limit?

        // Run loop which starts at local counter start of v1Migrated
        uint loopStart = v1Migrated[address(pack)][id];

        // For each element, get the old card and make the
        // appropriate conversion + check not activated
        for (uint i = loopStart; i < size; i++) {
            protos[i] = convertProto(protos[i]);
            qualities[i] = convertPurity(purities[i]);
        }

        // Batch Mint cards (details passed as function args)
        cards.batchMintCards(user, protos, qualities);

        v1Migrated[address(pack)][id] += size;

        uint loopEnd = loopStart + size;
        emit Migrated(user, id, loopStart, loopEnd);
    }

}