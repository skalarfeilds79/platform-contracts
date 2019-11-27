pragma solidity ^0.5.8;

import "../Wallet.sol";
import "./Module.sol";

contract BaseModule is Module {

    modifier onlyWalletOwner(Wallet _wallet) {
        require(msg.sender == address(this) || msg.sender == _wallet.owner(), "must be wallet owner");
        _;
    }

    function onEnabled(Wallet _wallet) public {
        // empty hook
    }

    function onDisabled(Wallet _wallet) public {
        // empty hook
    }

}