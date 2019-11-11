pragma solidity 0.5.11;

import "../interfaces/ICards.sol";
import "../legacy/packs/five/IPackFive.sol";
import "./BaseMigration.sol";

contract v2Migration is BaseMigration {

    ICards cards;
    uint public limit;

    constructor(
        ICards _cards,
        address[] memory _packs,
        uint _limit
    )
        public
    {
        for (uint i = 0; i < _packs.length; i++) {
            canMigrate[_packs[i]] = true;
        }

        limit = _limit;
        cards = _cards;
    }

    mapping (address => bool) public canMigrate;
    mapping (address => mapping (uint => bool)) public v2Migrated;

    event Migrated(
        address indexed user,
        uint id,
        uint start,
        uint end,
        uint startID
    );

    // PackFive = pack factory which creates packs and cards

    function migrate(
        IPackFive pack,
        uint id
    )
        public
    {
        require(
            canMigrate[address(pack)],
            "V2: must be migrating from an approved pack"
        );

        (uint count, uint randomness,,,,, address user) = pack.purchases(id);
        uint[] memory state = pack.getPurchaseState(id);

        require(
            noCardsActivated(state),
            "V2: must have no cards activated"
        );

        // Check if randomness set
        require(
            randomness != 0,
            "V2: must have had randomness set"
        );

        uint size = count * 5;
        // If the size is greater than the limit, throw (need a split v2 later, hoping to avoid)
        require(size <= limit, "must be less than limit");

        // If no cards activated, then we just create all of the cards (count * 5)
        require(
            !v2Migrated[address(pack)][id],
            "V2: must not have been migrated previously"
        );

        uint16[] memory protos;
        uint16[] memory purities;
        uint8[] memory qualities = new uint8[](size);

        (protos, purities) = pack.predictPacks(id);

        // For each element, get the old card and make the appropriate conversion
        // + check not activated
        for (uint i = 0; i < size; i++) {
            protos[i] = convertProto(protos[i]);
            qualities[i] = convertPurity(purities[i]);
        }

        // Mint cards (details passed as function args)
        uint startID = cards.mintCards(user, protos, qualities);

        v2Migrated[address(pack)][id] = true;

        emit Migrated(user, id, 0, size, startID);
    }

    function noCardsActivated(
        uint[] memory state
    )
        public
        pure
        returns (bool)
    {
        for (uint i = 0; i < state.length; i++) {
            if (state[i] != 0) {
                return false;
            }
        }
        return true;
    }
}