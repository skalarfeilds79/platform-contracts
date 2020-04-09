pragma solidity 0.6.6;

import "../util/String.sol";

contract ImmutableToken {

    string public constant baseURI = "https://api.immutable.com/asset/";

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        return string(abi.encodePacked(
            baseURI,
            String.fromAddress(address(this)),
            "/",
            String.fromUint(tokenId)
        ));
    }

}