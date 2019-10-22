pragma solidity 0.5.11;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract ICards is IERC721 {

    function getDetails(uint tokenId) public view returns (uint16 proto, uint8 quality);
    function setQuality(uint tokenId, uint8 quality) public;
    function burn(uint tokenId) public;
    function blockMintCards(address to, uint16[] memory _protos, uint8[] memory _qualities) public;
    function mintCards(address to, uint16[] memory _protos, uint8[] memory _qualities) public;

}