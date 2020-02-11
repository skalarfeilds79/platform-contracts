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
        address[] minters;
    }

    /**
     * Events
     */

    event PromoAssigned(
        uint16 proto,
        address minter
    );

    event PromoLocked(
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

    /**
     * @dev Mint multiple cards with multiple properties.
     *
     * @param _to Owner of newly minted cards
     * @param _protos The protos to be minted
     * @param _qualities The qualities to be minted
     */
    function mint(
        address _to,
        uint16[] memory _protos,
        uint8[] memory _qualities
    )
        public
    {
        require(
            _protos.length == _qualities.length,
            "Promo Factory: array length mismatch between protos and qualities"
        );

        for (uint i; i < _protos.length; i++) {
            uint16 proto = _protos[i];
            require(
                isValidMinter(msg.sender, proto) == true,
                "Promo Factory: only assigned minter can mint for this proto"
            );

            require(
                promos[proto].isLocked == false,
                "Promo Factory: cannot mint a locked proto"
            );
        }

        cards.mintCards(_to, _protos, _qualities);
    }

    /**
     * @dev Mint a single card.
     *
     * @param _to Destination address to receive card.
     * @param _proto Proto of card
     * @param _quality Quality of card
     */
    function mintSingle(
        address _to,
        uint16 _proto,
        uint8 _quality
    )
        public
    {

        require(
            isValidMinter(msg.sender, _proto) == true,
            "Promo Factory: only assigned minter can mint for this proto"
        );

        require(
            promos[_proto].isLocked == false,
            "Promo Factory: cannot mint a locked proto"
        );

        cards.mintCard(_to, _proto, _quality);
    }

    /**
     * @dev Return all the valid minters for a proto
     *
     * @param _proto Proto to check against
     */
    function validMinters(
        uint16 _proto
    )
        public
        view
        returns (address[] memory)
    {
        return promos[_proto].minters;
    }

    /**
     * @dev Check if an address is a valid minter
     *
     * @param _minter The minter to check
     * @param _proto The proto to check against
     */
    function isValidMinter(
        address _minter,
        uint16 _proto
    )
        public
        view
        returns (bool)
    {
        Promo memory promo = promos[_proto];
        for (uint256 i = 0; i < promo.minters.length; i++) {
            if (promo.minters[i] == _minter) {
                return true;
            }
        }

        return false;
    }

    /**
     * @dev Check if a promo is locked
     *
     * @param _proto The proto to check against
     */
    function isPromoLocked(
        uint16 _proto
    )
        public
        view
        returns (bool)
    {
        return promos[_proto].isLocked;
    }

    /**
     * Only Owner functions
     */

    /**
     * @dev Assign an address to be a minter for a promo.
     * 
     * @param _minter The minter to add
     * @param _proto The proto to assign the minter to
     */
    function assignPromoMinter(
        address _minter,
        uint16 _proto
    )
        public
        onlyOwner
    {
        require(
            _proto >= minProto,
            "Promo Factory: proto must be greater than min proto"
        );

        require(
            _proto <= maxProto,
            "Promo Factory: proto must be less than max proto"
        );

        require(
            promos[_proto].isLocked == false,
            "Promo Factory: proto already locked"
        );

        promos[_proto].minters.push(_minter);

        emit PromoAssigned(_proto, _minter);

    }

    /**
     * @dev Remove an address to be a minter for a promo.
     * 
     * @param _minter The minter to remove
     * @param _proto The proto to remove the minter from
     */
    function removePromoMinter(
        address _minter,
        uint16 _proto
    )
        public
        onlyOwner
    {
        bool found = false;
        uint index = 0;

        Promo storage promo = promos[_proto];
        for (uint i = 0; i < promo.minters.length; i++) {
            if (promo.minters[i] == _minter) {
                index = i;
                found = true;
            }
        }

        require(
            found == true,
            "Promo Factory: Must be a valid minter"
        );

        for (uint i = index; i < promo.minters.length - 1; i++){
            promo.minters[i] = promo.minters[i+1];
        }

        delete promo.minters[promo.minters.length - 1];
        promo.minters.length--;
    }

    /**
     * @dev Lock a proto so more cards can't be minted
     *
     * @param _proto The proto to lock
     */
    function lock(
        uint16 _proto
    )
        public
        onlyOwner
    {
        require(
            promos[_proto].minters.length != 0,
            "Promo Factory: must be an assigned proto"
        );

        require(
            promos[_proto].isLocked == false,
            "Promo Factory: cannot lock a locked proto"
        );

        promos[_proto].isLocked = true;

        emit PromoLocked(_proto);
    }

}