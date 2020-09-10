pragma solidity 0.5.11;

import "./Beacon.sol";

contract Utility {
    
    Beacon beacon;
    
    constructor (Beacon _beacon) public {
        beacon = _beacon;
    }
    
    function recommit(uint256[] memory _blocks) public {
        for (uint i = 0; i < _blocks.length; i++) {
            beacon.recommit(_blocks[i], 0);
        }
    }
    
    function callback(uint256[] memory _blocks) public {
        for (uint i = 0; i < _blocks.length; i++) {
            beacon.callback(_blocks[i]);
        }
    }

}