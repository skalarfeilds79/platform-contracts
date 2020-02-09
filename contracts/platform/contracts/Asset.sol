pragma solidity ^0.5.11;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Asset {

    function transferAllFrom(address from, address to, uint[] calldata ids) external;

}