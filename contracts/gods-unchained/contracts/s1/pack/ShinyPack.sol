pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "./Pack.sol";

contract ShinyPack is Pack {

    constructor(
        IRaffle _raffle,
        IBeacon _beacon,
        ICards _cards,
        IReferral _referral,
        bytes32 _sku,
        ICreditCardEscrow _escrow,
        IPay _pay
    ) public Pack(
        _raffle,
        _beacon,
        _cards,
        _referral,
        _sku,
        14999,
        _escrow,
        _pay
    ) {}

    function _getCardDetails(uint _index, uint _random) internal view returns (uint16 proto, uint8 quality) {

        Components memory rc = _getComponents(_index, _random);
        Rarity rarity;

        if (_index % 5 == 0) {
            rarity = Rarity.Legendary;
            quality = _getShinyQuality(rc.quality);
        } else if (_index % 5 == 1) {
            rarity = _getRarePlusRarity(rc.rarity);
            quality = _getQuality(rc.quality);
        } else {
            rarity = _getCommonPlusRarity(rc.rarity);
            quality = _getQuality(rc.quality);
        }
        proto = _getRandomCard(rarity, rc.proto);
        return (proto, quality);
    }

}