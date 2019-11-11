pragma solidity ^0.5.11;

import "@openzeppelin/contracts/ownership/Ownable.sol";

import "../interfaces/ICards.sol";

contract PromoFactory is Ownable {

    ICards public cards;

    mapping(uint16 => Promo) public promos;

    uint16 public maxProto;
    uint16 public minProto;

    struct Promo {
        bool isLocked;
        address minter;
    }

    event PromoAssigned(
        uint16 promo,
        address minter
    );

    event PromoLocked(
        uint16 promo
    );

    constructor(
        ICards _cards,
        uint16 _minProto,
        uint16 _maxProto
    )
        public
    {
        cards = _cards;
        minProto = _minProto;
        maxProto = _maxProto;
    }

    function assignPromoMinter(
        address minter,
        uint16 proto
    )
        public
        onlyOwner
    {
        require(
            proto >= minProto,
            "Promo Factory: promo must be greater than min proto"
        );

        require(
            proto <= maxProto,
            "Promo Factory: promo must be less than max proto"
        );

        require(
            promos[proto].isLocked == false,
            "Promo Factory: promo already locked"
        );

        promos[proto].minter = minter;

        emit PromoAssigned(proto, minter);

    }

    function mint(
        uint16 promo
    )
        public
    {
        require(
            promos[promo].minter == msg.sender,
            "Promo Factory: only assigned minter can mint for this promo"
        );

        require(
            promos[promo].isLocked == false,
            "Promo Factory: cannot mint a locked promo"
        );

        // TODO: Call mint function;

    }

    function lock(
        uint16 promo
    )
        public
        onlyOwner
    {
        require(
            promos[promo].minter != address(0),
            "Promo Factory: must be an assigned promo"
        );

        require(
            promos[promo].isLocked == false,
            "Promo Factory: cannot lock a locked promo"
        );

        promos[promo].isLocked = true;

        emit PromoLocked(promo);
    }
}