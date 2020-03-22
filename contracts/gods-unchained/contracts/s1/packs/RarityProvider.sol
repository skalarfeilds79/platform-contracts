pragma solidity 0.5.11;

contract RarityProvider {

    uint16[] legendaries = [4];
    uint16[] epics = [3];
    uint16[] rares = [2];
    uint16[] commons = [1];

    enum Rarity {
        Common, 
        Rare, 
        Epic, 
        Legendary,
        Mythic
    }

    struct RandomnessComponents {
        uint32 rarity;
        uint16 quality;
        uint16 proto;
    }

    // return 'length' bytes of 'num' starting at 'start'
    function extract(uint num, uint length, uint start) internal pure returns (uint) {
        return (((1 << (length * 8)) - 1) & (num >> ((start - 1) * 8)));
    }

    // divides the random seed into components
    function getComponents(
        uint cardIndex, uint rand
    ) internal pure returns (
        RandomnessComponents memory
    ) {
        uint random = uint(keccak256(abi.encodePacked(cardIndex, rand)));
        return RandomnessComponents({
            random: random,
            rarity: uint32(extract(random, 4, 10) % 1000000),
            quality: uint16(extract(random, 2, 4) % 1000),
            proto: uint16(extract(random, 2, 8) % (2**16-1))
        });
    }

    function _getCommonPlusRarity(uint32 rand) internal pure returns (Rarity) {
        if (rand >= 998345) {
            return Rarity.Legendary;
        } else if (rand >= 986765) {
            return Rarity.Epic;
        } else if (rand >= 924890) {
            return Rarity.Rare;
        } else {
            return Rarity.Common;
        }
    }

    function _getRarePlusRarity(uint32 rand) internal pure returns (Rarity) {
        if (rand >= 981615) {
            return Rarity.Legendary;
        } else if (rand >= 852940) {
            return Rarity.Epic;
        } else {
            return Rarity.Rare;
        }
    }

    function _getEpicPlusRarity(uint32 rand) internal pure returns (Rarity) {
        if (rand >= 981615) {
            return Rarity.Legendary;
        } else {
            return Rarity.Epic;
        }
    }

    function _getLegendary(uint32 rand) internal pure returns (Rarity) {
        return Rarity.Legendary;
    }

    function _getQuality(uint16 randOne) internal pure returns (uint16) {
        if (randOne >= 998) {
            return 1;
        } else if (randOne >= 988) {
            return 2;
        } else if (randOne >= 938) {
            return 3;
        } else {
            return 4;
        }
    }

    function _getShinyQuality(uint16 randOne) internal pure returns (uint16) {
        if (randOne >= 998) {
            return 1;
        } else if (randOne >= 748) {
            return 2;
        } else {
            return 3;
        }
    }

    function _getRandomCard(Rarity rarity, uint16 random) internal view returns (uint16) {
        // modulo bias is fine - creates rarity tiers etc
        // will obviously revert is there are no cards of that type: this is expected - should never happen
        if (rarity == Rarity.Common) {
            return commons[random % common.length];
        } else if (rarity == Rarity.Rare) {
            return rares[random % rare.length];
        } else if (rarity == Rarity.Epic) {
            return epics[random % epic.length];
        } else {
            return legendaries[random % legendary.length];
        }
    }

}