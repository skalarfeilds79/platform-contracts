pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "./Pack.sol";

contract LegendaryPack is Pack {

    constructor(
        IRaffle _raffle,
        IBeacon _beacon,
        ICards _cards,
        IReferral _referral,
        bytes32 _sku,
        ICreditCardEscrow _escrow,
        IPay _pay
    ) public Pack(
        _raffle, _beacon, _cards,
        _referral, _sku,
        649, _escrow, _pay
    ) {}

    function _getCardDetails(uint _index, uint _random) internal view returns (uint16 proto, uint8 quality) {
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

    function _getTicketsPerPack(uint _index, uint _random) internal pure returns (uint16) {
        uint seed = uint(keccak256(abi.encodePacked(_random, _index)));
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