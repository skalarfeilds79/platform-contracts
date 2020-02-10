pragma solidity ^0.5.11;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract TestERC721 is ERC721Full {

    uint totalCount = 0;

    function mint(uint count, address owner) public {
        uint start = totalCount;
        for (uint i = 0; i < count; i++) {
            _mint(owner, start + i);
        }
        totalCount += count;
    }

}