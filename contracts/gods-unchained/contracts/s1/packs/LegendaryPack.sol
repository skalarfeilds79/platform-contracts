pragma solidity 0.5.11;

import "./Pack.sol";

contract LegendaryPack is Pack {

    constructor(
        IBeacon _beacon, bytes32 _sku,
        IReferral _referral, ICreditCardEscrow _fiatEscrow,
        IEscrow _escrow, IProcessor _processor
    ) public Pack(
        _beacon, _sku, 0, 299, _referral, _fiatEscrow, _escrow, _processor
    ) {}

    function _getCardDetails(uint cardIndex, uint result) internal view returns (uint16 proto, uint8 quality) {
        RandomnessComponents memory rc = getComponents(cardIndex, result);
        Rarity rarity;
        if (cardIndex % 5 == 0) {
            rarity = Rarity.Legendary;
        } else if (cardIndex % 5 == 1) {
            rarity = _getRarePlusRarity(rc.rarity);
        } else {
            rarity = _getCommonPlusRarity(rc.rarity);
        }
        return (_getRandomCard(rarity, rc.proto), _getQuality(rc.quality));
    }

}