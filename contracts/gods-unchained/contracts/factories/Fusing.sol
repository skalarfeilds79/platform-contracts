pragma solidity 0.5.11;

import "@openzeppelin/contracts/ownership/Ownable.sol";

import "../interfaces/ICards.sol";

contract Fusing is Ownable {

    event CardFused(
        address owner,
        address tokenAddress,
        uint tokenId,
        uint[] references
    );

    // Add minter function
    // Remove minter function
    // Get core cards contract address

    modifier validMinter(address _minter) {
        _;
        // Add logic to validate the minter is correct
    }

    function fuse(
        uint proto,
        uint quality,
        address to,
        uint[] memory references
    )
        public
        validMinter(msg.sender)
        returns (uint tokenId)
    {

        // Proto should be of core cards (GET THIS FROM ALEX)
        // Valid to address is valid

        // Mint a token with quality and proto

        // Emit an event

    }

}