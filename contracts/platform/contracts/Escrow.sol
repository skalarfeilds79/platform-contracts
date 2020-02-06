pragma solidity ^0.6.1;

import "./Asset.sol";

contract Escrow {

    // Emitted when a range of tokens is locked 
    event RangeEscrowed(uint id);
    // Emitted when a list of tokens is locked
    event ListEscrowed();

    // Emitted when a range of tokens is released
    event RangeReleased();
    // Emitted when a list of tokens is released
    event ListReleased();

    // Emitted when a range of tokens is rescinded
    event RangeRescinded();
    // Emitted when a list of tokens is rescinded
    event ListRescinded();

    struct Account {
        // The 
        Asset asset;
        // the high and low of the range
        uint high;
        uint low;
        // the list of the . If the length of this array is 0, the 
        uint[] ids;

        // the address which will be able to 'own' this item in games
        address owner;
        // the end of the escrow period
        uint256 endBlock;
        // the address this vault will be released to after the escrow period
        address releaseTo;
        // the address authorised to destroy these assets during the escrow period
        address rescinder;
    }

    // All escrow accounts 
    // TODO: should old escrow accounts be cleared? If so, how to structue?
    Account[] public Account;

    function escrowRange(
        Asset _asset, uint low, uint high,
        address owner, uint duration, uint releaseTo, uint rescinder
    ) public returns (uint) {

    }

    function escrowList(
        Asset _asset, uint[] ids,
        address owner, uint duration, uint releaseTo, uint rescinder
    ) public returns (uint) {

    }

    function rescind(uint _id) public {
        
    }

    function release(uint _id) public {
        
    }

    function _buildList(uint low, uint high) internal returns (uint[] memory) {
        uint length = high - low;
        uint[] memory ids = uint[](length);
        for (uint i = 0; i < length; i++) {
            ids[i] = low + i;
        }
        return ids;
    }

}