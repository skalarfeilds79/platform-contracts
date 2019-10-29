pragma solidity 0.5.11;

contract ICards {

    enum Rarity {
        Common, Rare, Epic, Legendary, Mythic
    }

    function getRandomCard(Rarity rarity, uint16 random) public view returns (uint16);
    function createCard(address user, uint16 proto, uint16 purity) public returns (uint);


}