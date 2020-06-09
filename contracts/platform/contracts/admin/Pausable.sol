pragma solidity 0.5.11;

import "@openzeppelin/contracts/ownership/Ownable.sol";

contract Pausable is Ownable {

    bool public paused;

    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
    }

    modifier whenUnpaused {
        require(!paused, "Pausable: must not be paused");
        _;
    }

    modifier whenPaused {
        require(paused, "Pausable: must be paused");
        _;
    }

}