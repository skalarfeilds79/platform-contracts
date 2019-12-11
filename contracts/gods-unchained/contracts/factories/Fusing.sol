pragma solidity 0.5.11;

import "@openzeppelin/contracts/ownership/Ownable.sol";

import "../interfaces/ICards.sol";

contract Fusing is Ownable {

    ICards public cards;

    address[] public minters;

    event MinterAdded(
        address minter
    );

    event MinterRemoved(
        address minter
    );

    event CardFused(
        address owner,
        address tokenAddress,
        uint tokenId,
        uint[] references
    );

    /**
     * @dev Check if the address is a valid minter
     * 
     * @param _minter is the address to check against
     */
    modifier validMinter(address _minter) {
        _;
        // Add logic to validate the minter is correct
    }

    constructor(ICards cards) public {

    }

    /**
     * @dev Add a minter to the list of addresses that can fuse cards
     *
     * @param _minter is the address of the minter to add
     */
    function addMinter(
        address _minter
    )
        public
    {

    }

    /**
     * @dev Remove a minter to the list of addresses that can fuse cards
     *
     * @param _minter is the address of the minter to remove
     */
    function removeMinter(
        address _minter
    )
        public
    {

    }

    /**
     * @dev Combine multiple cards that live off-chain to be on-chain.
     *
     * @param _proto is the proto number for the new card
     * @param _quality is the output quality for the new card
     * @param _to is the address to give the new card to
     * @param _references is a list of card id references off-chain to be burned
     */
    function fuse(
        uint _proto,
        uint _quality,
        address _to,
        uint[] memory _references
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