pragma solidity ^0.6.1;

import "../Asset.sol";

contract Escrow {

    // Emitted when a range of tokens is escrowed 
    event RangeEscrowed(
        uint indexed id,
        address indexed owner,
        address indexed asset, 
        uint low, 
        uint high,
        address releaser
    );

    // Emitted when a list of tokens is escrowed
    event ListEscrowed(
        uint indexed id
        address indexed owner,
        address indexed asset, 
        uint[] ids,
        address releaser
    );

    // Emitted when an account is released
    event Released(
        uint indexed id
    );

    struct Account {
        // the address which will own these assets during escrow
        address owner;
        // the address authorised to release these assets from escrow
        address releaser;
        // The contract address of the asset 
        Asset asset;
        // The low end id of the range in escrow
        uint low;
        // The high end id of the range in escrow
        uint high;
        // the list of the token ids in escrow. If the length of this array is 0, a range has been escrowed
        uint[] ids;
    }

    // Count of how many escrow accounts have been created
    uint public counter;
    // Mapping from id to escrow accounts, used rather than an array to enable deleting released accounts
    mapping(uint => Account) accounts;

    /**
     * @dev Escrow a consecutive range of assets
     *
     * @param _asset NFT contract address of the assets to be escrowed
     * @param _low The first token ID in the range to be escrowed (inclusive)
     * @param _high The last token ID in the range to be escrowed (inclusive)
     * @param _owner Address which will own these assets during escrow
     * @param _releaser Address which can release these assets from escrow
     */
    function escrowRange(
        Asset _asset, 
        uint _low, 
        uint _high,
        address _owner, 
        address _releaser
    ) public returns (uint) {

    }

    /**
     * @dev Escrow a list of assets
     *
     * @param _asset NFT contract address of the assets to be escrowed
     * @param _ids Token IDs of the cards to be escrowed
     * @param _owner Address which will own these assets during escrow
     * @param _releaser Address which can release these assets from escrow
     */
    function escrowList(
        Asset _asset, 
        uint[] _ids,
        address _owner, 
        address _releaser
    ) public returns (uint) {
        
    }

    /**
     * @dev Release cards from escrow. Can only be called by the account's releaser. 
     *
     * @param _id ID of the escrow account
     * @param _to Address to which the cards should be transferred
     */
    function release(
        uint _id, 
        address _to
    ) public {
        
    }

    function _buildList(
        uint low, 
        uint high
    ) internal returns (uint[] memory) {
        uint length = high - low;
        uint[] memory ids = uint[](length);
        // <= as the range is inclusive a
        for (uint i = 0; i <= length; i++) {
            ids[i] = low + i;
        }
        return ids;
    }

}