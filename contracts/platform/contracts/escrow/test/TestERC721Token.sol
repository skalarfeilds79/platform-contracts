pragma solidity 0.5.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TestERC721Token is ERC721 {

    function mint(address to, uint256 value) public {
        _mint(to, value);
        count++;
    }

    uint256 internal count;

    function totalSupply() public view returns (uint256) {
        return count;
    }

}