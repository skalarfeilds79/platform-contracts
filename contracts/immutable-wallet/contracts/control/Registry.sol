pragma solidity ^0.5.8;

import "@openzeppelin/contracts/ownership/Ownable.sol";

contract Registry is Ownable {

    uint64 public delayTime;

    mapping (address => uint64) internal enabledAfter;
    mapping (address => bytes32) internal names;

    event ContractRegistered(address indexed _contract, bytes32 name);
    event ContractDeregistered(address indexed _contract);

    constructor(uint64 _delayTime) public {
        delayTime = _delayTime;
    }

    function register(address _contract, bytes32 _name) public onlyOwner {
        enabledAfter[_contract] = uint64(now) + delayTime;
        names[_contract] = _name;
        emit ContractRegistered(_contract, _name);
    }

    function deregister(address _contract) public onlyOwner {
        require(isRegistered(_contract), "contract must be registered");
        enabledAfter[_contract] = 0;
        emit ContractDeregistered(_contract);
    }

    function isRegistered(address _contract) public view returns (bool) {
        return (enabledAfter[_contract] != 0) && (now > enabledAfter[_contract]);
    }

    function areRegistered(address[] memory _contracts) public view returns (bool) {
        for (uint i = 0; i < _contracts.length; i++) {
            if (!isRegistered(_contracts[i])) {
                return false;
            }
        }
        return true;
    }

    function getName(address _contract) public view returns (bytes32) {
        return names[_contract];
    }

    function getEnabledAfter(address _contract) public view returns (uint64) {
        return enabledAfter[_contract];
    }

}