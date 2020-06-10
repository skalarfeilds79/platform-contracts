pragma solidity 0.5.11;

import "@openzeppelin/contracts/ownership/Ownable.sol";

contract Freezable is Ownable {

    bool public frozen;
    address public freezer;

    constructor() public {
        freezer = msg.sender;
    }

    function setFreezer(address _freezer) external onlyOwner {
        freezer = _freezer;
    }

    function setFrozen(bool _frozen) external {
        require(msg.sender == freezer, "Freezable: must be freezer");
        frozen = _frozen;
    }

    modifier whenUnfrozen {
        require(!frozen, "Freezable: must not be frozen");
        _;
    }

    modifier whenFrozen {
        require(frozen, "Freezable: must be frozen");
        _;
    }

}