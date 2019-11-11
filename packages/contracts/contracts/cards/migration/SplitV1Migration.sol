pragma solidity 0.5.11;

import "../ICards.sol";
import "../legacy/packs/four/IPackFour.sol";
import "./BaseMigration.sol";

contract SplitV1Migration is BaseMigration {

    ICards cards;
    uint public oldLimit;
    uint16 public newLimit;
    uint16 public constant size = 5;

    constructor(
        ICards _cards,
        address[] memory _packs,
        uint _oldLimit,
        uint16 _newLimit
    ) public {

        for (uint i = 0; i < _packs.length; i++) {
            canMigrate[_packs[i]] = true;
        }

        cards = _cards;
        oldLimit = _oldLimit;
        require(_newLimit % size == 0, "limit must be divisible by size");
        newLimit = _newLimit;
    }

    mapping (address => bool) public canMigrate;

    mapping (address => mapping (uint => uint16)) public v1Migrated;

    event Migrated(
        address indexed user,
        address indexed pack,
        uint indexed id,
        uint start,
        uint end,
        uint startID
    );

    function migrateAll(
        IPackFour pack,
        uint[] memory ids
    ) public {
        for (uint i = 0; i < ids.length; i++) {
            migrate(pack, ids[i]);
        }
    }

    struct StackDepthLimit {
        uint16 proto;
        uint16 purity;
        uint16[] protos;
        uint8[] qualities;
    }

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

        uint16 remaining = ((count - current) * size);

        require(
            remaining > oldLimit,
            "V1: must have not been able to activate in v1"
        );

        remaining -= v1Migrated[address(pack)][id];

        uint16 loopStart = (current * size) + v1Migrated[address(pack)][id];

        uint16 len = remaining > newLimit ? newLimit : remaining;

        StackDepthLimit memory sdl;

        sdl.protos = new uint16[](len);
        sdl.qualities = new uint8[](len);

        uint16 packStart = loopStart / size;

        for (uint16 i = 0; i < len / size; i++) {
            for (uint8 j = 0; j < size; j++) {
                uint index = (i * size) + j;
                (sdl.proto, sdl.purity) = pack.getCardDetails(i + packStart, j, randomness);
                sdl.protos[index] = convertProto(sdl.proto);
                sdl.qualities[index] = convertPurity(sdl.purity);
            }
        }

        // Batch Mint cards (details passed as function args)
        uint startID = cards.mintCards(user, sdl.protos, sdl.qualities);

        v1Migrated[address(pack)][id] += len;

        uint loopEnd = loopStart + len;

        emit Migrated(user, address(pack), id, loopStart, loopEnd, startID);
    }

}