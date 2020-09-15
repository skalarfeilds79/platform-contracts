pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "./OptimizedPack.sol";

contract OptimizedLegendaryPack is OptimizedPack {

    constructor(
        S1Cap _cap,
        bytes32 _sku,
        uint256 _price,
        PurchaseProcessor _pay
    ) public OptimizedPack(
        _cap,
        _sku,
        _price,
        _pay
    ) {}

    function _getCardDetails(
        uint _index,
        uint _random
    )
        internal
        view
        returns (uint16 proto, uint8 quality)
    {
        Components memory rc = _getComponents(_index, _random);
        Rarity rarity;
        if (_index % 5 == 0) {
            rarity = Rarity.Legendary;
        } else if (_index % 5 == 1) {
            rarity = _getRarePlusRarity(rc.rarity);
        } else {
            rarity = _getCommonPlusRarity(rc.rarity);
        }
        return (_getRandomCard(rarity, rc.proto), _getQuality(rc.quality));
    }

    function _getTicketsInPack(uint _index, uint _random) internal pure returns (uint16) {
        uint seed = uint(keccak256(abi.encodePacked(_index, _random)));
        uint modded = seed % 1000;
        if (modded >= 975) {
            return 3000;
        } else if (modded >= 900) {
            return 2000;
        } else if (modded >= 725) {
            return 1000;
        }
        return 500;
    }

}