pragma solidity 0.5.11;

import "../Beacon.sol";

contract Consumer {

    Beacon public beacon;

    constructor(Beacon _beacon) public {
        beacon = _beacon;
    }

    function multiCommit(uint count) public {
        for (uint i = 0; i < count; i++) {
            beacon.commit(0);
        }
    }

    function sameBlockCallback() public {
        beacon.commit(0);
        beacon.randomnessOrCallback(block.number);
    }

    function multiCallback(uint256 commitBlock, uint256 count) public {
        for (uint i = 0; i < count; i++) {
            beacon.randomnessOrCallback(commitBlock);
        }
    }

    function requireSameRandomness(uint256 a, uint256 b) public {
        bytes32 aRand = beacon.randomnessOrCallback(a);
        bytes32 bRand = beacon.randomnessOrCallback(b);
        require(aRand == bRand, "must be the same randomness");
    }
}