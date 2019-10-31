pragma solidity 0.5.11;

import "../../legacy/cards/LegacyICards.sol";

contract MultiMint {

    LegacyICards cards;

    constructor(LegacyICards _cards) public {
        cards = _cards;
    }

    function createCards(address user, uint16[] memory protos, uint16[] memory purities) public {
        require(protos.length == purities.length, "wrong lengths");
        for (uint i = 0; i < protos.length; i++) {
            cards.createCard(user, 1, 1);
        }
    }
}