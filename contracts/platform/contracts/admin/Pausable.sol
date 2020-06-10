pragma solidity 0.5.11;

import "@openzeppelin/contracts/ownership/Ownable.sol";

contract Pausable is Ownable {

    bool public paused;
    address public pauser;

    constructor() public {
        pauser = msg.sender;
    }

    function setPauser(address _pauser) external onlyOwner {
        pauser = _pauser;
    }

    function setPaused(bool _paused) external {
        require(msg.sender == pauser, "Pausable: must be pauser");
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