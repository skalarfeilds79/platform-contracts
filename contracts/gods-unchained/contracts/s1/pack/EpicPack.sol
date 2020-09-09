pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "./Pack.sol";

contract EpicPack is Pack {

    constructor(
        Beacon _beacon,
        S1Cap _cap,
        bytes32 _sku,
        uint256 _price,
        PurchaseProcessor _pay
    ) public Pack(
        _beacon,
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
        Rarity rarity = (_index % 5 == 0) ? _getEpicPlusRarity(rc.rarity) : _getCommonPlusRarity(rc.rarity);
        return (_getRandomCard(rarity, rc.proto), _getQuality(rc.quality));
    }

    function _getTicketsInPack(
        uint _index,
        uint _random
    )
        internal
        pure
        returns (uint16)
    {
        uint seed = uint(keccak256(abi.encodePacked(_index, _random)));
        uint modded = seed % 1000;
        if (modded >= 975) {
            return 1000;
        } else if (modded >= 850) {
            return 500;
        }
        return 150;
    }

}