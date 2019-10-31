pragma solidity 0.5.11;

import "../ICards.sol";
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
    mapping (address => mapping (uint => uint)) v2Migrated;

    event Migrated(
        address indexed user,
        uint id,
        uint start,
        uint end
    );

    // PackFive = pack factory which creates packs and cards

    function migrate(
        IPackFive pack,
        uint id
    )
        public
        returns (uint start, uint end)
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

         // Check if purchase can be activated
        require(
            pack.canActivatePurchase(id),
            "V2: can't activate purchase"
        );

        // Check if randomness set
        require(
            randomness != 0,
            "V2: must have had randomness set"
        );

        uint size = count * 5;
        // If the size is greater than the limit, bound it.
        // Don't want to throw as we don't know what packs will be large
        // but also resuming won't be possible.
        if (size > limit) {
            size = limit;
        }

        // If no cards activated, then we just create all of the cards (count * 5)
        require(
            v2Migrated[address(pack)][id] < size,
            "V2: must not have been migrated previously"
        );

        uint16[] memory protos;
        uint16[] memory purities;
        uint8[] memory qualities;

        (protos, purities) = pack.predictPacks(id);

        uint loopStart = v2Migrated[address(pack)][id];

        // For each element, get the old card and make the appropriate conversion
        // + check not activated
        for (uint i = loopStart; i < size; i++) {
            protos[i] = convertProto(protos[i]);
            qualities[i] = convertPurity(purities[i]);
        }

        // Mint cards (details passed as function args)
        cards.mintCards(user, protos, qualities);

        v2Migrated[address(pack)][id] += size;

        uint loopEnd = loopStart + size;
        emit Migrated(user, id, loopStart, loopEnd);
    }

    function noCardsActivated(
        uint[] memory state
    )
        public
        view
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