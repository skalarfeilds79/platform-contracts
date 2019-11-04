pragma solidity ^0.5.11;


contract PromoFactory {

    mapping(uint16 => bool) locked;
    mapping(uint16 => address) minters;

    function mint(uint16 promo) public {
        require(!locked[promo], "can mint");
    }

    function assignProto(uint16 proto, address minter) public {

    }

    // // 
    // mapping(uint16 => bool) locked;

    // mapping()

    // function mint(uint16 promo) {
    //     require(!locked[promo], "promo must not have been locked");

    // }
}