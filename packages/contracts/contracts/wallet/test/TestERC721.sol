pragma solidity ^0.5.8;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Mintable.sol";


contract TestERC721 is ERC721Full, ERC721Mintable {

    constructor() ERC721Full("Cards", "GUC") public {

    }
}