pragma solidity 0.5.11;

import "../IBeacon.sol";

contract Consumer {

    function multiCommit(IBeacon beacon, uint count) public {
        for (uint i = 0; i < count; i++) {
            beacon.commit(0);
        }
    }

    function sameBlockCallback(IBeacon beacon) public {
        beacon.commit(0);
        beacon.randomness(block.number);
    }

    function multiCallback(IBeacon beacon, uint256 commitBlock, uint256 count) public {
        for (uint i = 0; i < count; i++) {
            beacon.randomness(commitBlock);
        }
    }
}