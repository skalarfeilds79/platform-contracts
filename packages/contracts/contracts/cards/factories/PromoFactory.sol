pragma solidity ^0.5.11;

import "@openzeppelin/contracts/ownership/Ownable.sol";

import "../interfaces/ICards.sol";

contract ProtoFactory is Ownable {

    ICards public cards;

    mapping(uint16 => Proto) public protos;

    uint16 public maxProto;
    uint16 public minProto;

    struct Proto {
        bool isLocked;
        address minter;
    }

    /**
     * Events
     */

    event ProtoAssigned(
        uint16 proto,
        address minter
    );

    event ProtoLocked(
        uint16 proto
    );

    /**
     * Constructor
     */

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

    /**
     * Public functions
     */

    function mint(
        address to,
        uint16[] memory _protos,
        uint8[] memory _qualities
    )
        public
    {
        require(
            _protos.length == _qualities.length,
            "Proto Factory: array length mismatch between protos and qualities"
        );

        for (uint i; i < _protos.length; i++) {
            require(
                protos[_protos[i]].minter == msg.sender,
                "Proto Factory: only assigned minter can mint for this proto"
            );

            require(
                protos[_protos[i]].isLocked == false,
                "Proto Factory: cannot mint a locked proto"
            );
        }

        cards.mintCards(to, _protos, _qualities);
    }

    /**
     * Only Owner functions
     */

    function assignProtoMinter(
        address minter,
        uint16 proto
    )
        public
        onlyOwner
    {
        require(
            proto >= minProto,
            "Proto Factory: proto must be greater than min proto"
        );

        require(
            proto <= maxProto,
            "Proto Factory: proto must be less than max proto"
        );

        require(
            protos[proto].isLocked == false,
            "Proto Factory: proto already locked"
        );

        protos[proto].minter = minter;

        emit ProtoAssigned(proto, minter);

    }

    function lock(
        uint16 proto
    )
        public
        onlyOwner
    {
        require(
            protos[proto].minter != address(0),
            "Proto Factory: must be an assigned proto"
        );

        require(
            protos[proto].isLocked == false,
            "Proto Factory: cannot lock a locked proto"
        );

        protos[proto].isLocked = true;

        emit ProtoLocked(proto);
    }
}