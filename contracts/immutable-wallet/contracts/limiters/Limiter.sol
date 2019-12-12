pragma solidity ^0.5.8;

import "../Wallet.sol";

contract Limiter {

    function canExecute(
        Wallet _wallet,
        Module _sender,
        address _to,
        bytes memory _data,
        uint _value
    )
        public
        returns (bool);

    function canChange(
        Wallet _wallet,
        Module _changer,
        address _changeTo
    )
        public
        returns (bool);

    function onEnabled(Wallet _wallet)
        public;

    function onDisabled(Wallet _wallet)
        public;

}