pragma solidity ^0.5.11;

import "../ICards.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./OldToken.sol";

contract DirectMigration {

    uint threshold;
    OldToken old;
    ICards cards;
    uint limit;

    event Migrated(uint oldStart, uint oldEnd, uint newStart);

    constructor(OldToken _old, ICards _cards, uint _threshold, uint _limit) public {
        old = _old;
        cards = _cards;
        threshold = _threshold;
        limit = _limit;
    }

    uint public migrated;

    function activatedMigration() public returns (uint current) {
        uint start = migrated;
        address first = old.ownerOf(start);
        current = start;
        address owner = first;

        uint last = old.totalSupply();

        uint cap = start + limit;

        while (owner == first && current < cap) {
            current++;
            if (current >= last) {
                break;
            }
            owner = old.ownerOf(current);
        }

        uint size = current - start;

        require(size > 0, "size is zero");

        uint16[] memory protos = new uint16[](size);
        uint8[] memory qualities = new uint8[](size);
        uint16 proto;
        uint16 purity;

        for (uint i = 0; i < size; i++) {
            (proto, purity) = old.getCard(start+i);
            protos[i] = proto;
            qualities[i] = convertPurity(purity);
        }

        uint newStart;
        if (size <= threshold) {
            newStart = cards.mintCards(first, protos, qualities);
        } else {
            newStart = cards.batchMintCards(first, protos, qualities);
        }

        migrated = current;

        emit Migrated(start, current, newStart);

        return current;
    }

    function convertPurity(uint16 purity) public pure returns (uint8) {
        return uint8((purity / 1000) + 2);
    }

}