pragma solidity 0.5.11;

import "../interfaces/ICards.sol";

contract Forge {

    ICards cards;
    uint8 constant diamond = 1;

    constructor(ICards _cards) public {
        cards = _cards;
    }

    function forge(uint[] memory _ids) public {
        require(
            _ids.length == 5,
            "Forge: must forge 5 at a time"
        );

        (uint16 proto, uint8 quality) = cards.getDetails(_ids[0]);
        address owner = cards.ownerOf(_ids[0]);

        require(
            quality > diamond,
            "Forge: cannot forge diamond cards"
        );

        for (uint i = 1; i < 5; i++) {
            (uint16 nextProto, uint8 nextQuality) = cards.getDetails(_ids[i]);

            require(
                proto == nextProto,
                "Forge: different protos"
            );

            require(
                quality == nextQuality,
                "Forge: different qualities"
            );

            require(
                cards.ownerOf(_ids[i]) == owner,
                "Forge: different owners"
            );

            cards.burn(_ids[i]);
        }

        cards.setQuality(_ids[0], quality - 1);
    }

}