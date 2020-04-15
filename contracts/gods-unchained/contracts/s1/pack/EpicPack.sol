pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "./Pack.sol";

contract EpicPack is Pack {

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
        Rarity rarity = (_index % 5 == 0) ? _getEpicPlusRarity(rc.rarity) : _getCommonPlusRarity(rc.rarity);
        return (_getRandomCard(rarity, rc.proto), _getQuality(rc.quality));
    }

    function _getTicketsInPack(uint _index, uint _random) internal pure returns (uint16) {
        uint seed = uint(keccak256(abi.encodePacked(_random, _index)));
        uint modded = seed % 1000;
        if (modded >= 975) {
            return 1000;
        } else if (modded >= 850) {
            return 500;
        }
        return 150;
    }

}