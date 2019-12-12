pragma solidity ^0.5.8;

import "../Wallet.sol";

contract Module {

    function onEnabled(Wallet _wallet) public;
    function onDisabled(Wallet _wallet) public;

}