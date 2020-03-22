pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "./Pack.sol";

contract EpicPack is Pack {

    constructor(
        IBeacon _beacon, ICards _cards, bytes32 _sku,
        IReferral _referral, ICreditCardEscrow _fiatEscrow,
        IProcessor _processor
    ) public Pack(
        _beacon, _cards, _sku, 0, 299, _referral, _fiatEscrow, _processor
    ) {}

    function _getCardDetails(uint cardIndex, uint result) internal view returns (uint16 proto, uint8 quality) {
        RandomnessComponents memory rc = getComponents(cardIndex, result);
        Rarity rarity = (cardIndex % 5 == 0) ? _getEpicPlusRarity(rc.rarity) : _getCommonPlusRarity(rc.rarity);
        return (_getRandomCard(rarity, rc.proto), _getQuality(rc.quality));
    }

}