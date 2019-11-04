pragma solidity ^0.5.8;

import "./ProxyData.sol";

contract Proxy is ProxyData {

    // proxy contract as described here: https://blog.gnosis.pm/solidity-delegateproxy-contracts-e09957d0f201

    event Received(address indexed from, bytes data, uint value);

    constructor(address _impl) public {
        require(_impl != address(0), "null implementation");
        implementation = _impl;
    }

    function() external payable {
        if (msg.data.length == 0 && msg.value > 0) {
            emit Received(msg.sender, msg.data, msg.value);
        } else {
            // solium-disable-next-line security/no-inline-assembly
            assembly {
                let target := sload(0)
                calldatacopy(0, 0, calldatasize())
                let result := delegatecall(gas, target, 0, calldatasize(), 0, 0)
                returndatacopy(0, 0, returndatasize())
                switch result
                case 0 {revert(0, returndatasize())}
                default {return (0, returndatasize())}
            }
        }
    }

}