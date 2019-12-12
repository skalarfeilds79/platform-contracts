pragma solidity ^0.5.8;

import "../common/WalletAware.sol";

contract SimpleDelegate is WalletAware {

    mapping (address => mapping (bytes4 => address)) public delegates;

    function register(Wallet _wallet, bytes4 _prefix, address _delegate) public onlyWallet(_wallet) {
        delegates[address(_wallet)][_prefix] = _delegate;
    }

    function getDelegate(Wallet _wallet, bytes4 _prefix, bytes memory, uint, address) public returns (address) {
        return delegates[address(_wallet)][_prefix];
    }

    function init() public {

    }

}