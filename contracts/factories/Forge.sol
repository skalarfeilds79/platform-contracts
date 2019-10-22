pragma solidity 0.5.11;

import "../ICards.sol";

contract Forge {

    ICards cards;
    uint8 maxQuality;

    constructor(ICards _cards, uint8 _maxQuality) public {
        cards = _cards;
        maxQuality = _maxQuality;
    }
    

    function forge(uint[] memory _ids) public {
        require(_ids.length == 5, "must forge 5 at a time");
        (uint16 proto, uint8 quality) = cards.getDetails(_ids[0]);
        address owner = cards.ownerOf(_ids[0]);
        require(quality < maxQuality, "cannot forge cards of maximum quality");
        for (uint i = 1; i < 5; i++) {
            (uint16 nextProto, uint8 nextQuality) = cards.getDetails(_ids[i]);
            require(proto == nextProto, "different protos");
            require(quality == nextQuality, "different qualities");
            require(cards.ownerOf(_ids[i]) == owner, "different owners");
            cards.burn(_ids[i]);
        }
        cards.setQuality(_ids[0], quality + 1);
    }

}