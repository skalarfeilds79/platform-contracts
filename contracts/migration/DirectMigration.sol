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
            protos[i] = convertProto(proto);
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

    function convertProto(uint16 proto) public view returns (uint16) {
        if (proto >= 1 && proto <= 377) {
            return proto;
        }
        // first phoenix
        if (proto == 380) {
            return 400;
        }
        // chimera
        if (proto == 394) {
            return 401;
        }
        // etherbots
        (bool found, uint index) = getEtherbotsIndex(proto);
        if (found) {
            return uint16(380 + index);
        }
        // hyperion
        if (proto == 378) {
            return 65000;
        }
        // prometheus
        if (proto == 379) {
            return 65001;
        }
        // atlas
        if (proto == 383) {
            return 65002;
        }
        // tethys
        if (proto == 384) {
            return 65003;
        }
        require(false, "unrecognised proto");
    }

    uint16[] internal ebs = [400, 413, 414, 421, 427, 428, 389, 415, 416, 422, 424, 425, 426, 382, 420, 417];

    function getEtherbotsIndex(uint16 proto) public view returns (bool, uint16) {
        for (uint16 i = 0; i < ebs.length; i++) {
            if (ebs[i] == proto) {
                return (true, i);
            }
        }
        return (false, 0);
    }

}