pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "./Pack.sol";

contract ShinyPack is Pack {

    constructor(
        IBeacon _beacon, bytes32 _sku,
        IReferral _referral, ICreditCardEscrow _fiatEscrow,
        IProcessor _processor
    ) public Pack(
        _beacon, _sku, 0, 299, _referral, _fiatEscrow, _processor
    ) {}

    function _getCardDetails(uint cardIndex, uint result) internal view returns (uint16 proto, uint8 quality) {

        RandomnessComponents memory rc = getComponents(cardIndex, result);
        Rarity rarity;

        if (cardIndex % 5 == 0) {
            rarity = Rarity.Legendary;
            quality = _getShinyQuality(rc.quality);
        } else if (cardIndex % 5 == 1) {
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