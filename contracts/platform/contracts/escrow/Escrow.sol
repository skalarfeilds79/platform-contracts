pragma solidity ^0.6.1;

import "./Asset.sol";

contract Escrow {

    // Emitted when a range of tokens is locked 
    event RangeEscrowed(uint id);
    // Emitted when a list of tokens is locked
    event ListEscrowed(uint id);

    // Emitted when a range of tokens is released
    event RangeReleased(uint id);
    // Emitted when a list of tokens is released
    event ListReleased(uint id);

    // Emitted when a range of tokens is rescinded
    event RangeRescinded(uint id);
    // Emitted when a list of tokens is rescinded
    event ListRescinded(uint id);

    struct Account {
        
        // the address which will own these assets during escrow
        address owner;
        // the address authorised to release these assets from escrow
        address releaser;

        // The contract address of the asset 
        Asset asset;
        // the high and low of the range
        uint high;
        uint low;
        // the list of the token ids in escrow. If the length of this array is 0, a range has been escrowed
        uint[] ids;
    }

    // All escrow accounts 
    // TODO: should old escrow accounts be cleared? If so, how to structue?
    Account[] public Account;

    function escrowRange(
        Asset _asset, uint _low, uint _high,
        address _owner, address _releaser
    ) public returns (uint) {

    }

    function escrowList(
        Asset _asset, uint[] _ids,
        address _owner, address _releaser
    ) public returns (uint) {

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