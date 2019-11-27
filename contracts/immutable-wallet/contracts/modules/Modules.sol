pragma solidity ^0.5.8;

import "../Wallet.sol";
import "./Module.sol";

contract Modules {

    function canExecute(
        Wallet _wallet,
        Module _sender,
        address _to,
        bytes memory _data,
        uint _value
    )
        public
        returns (bool);

    function enable(
        Wallet _wallet,
        Module _module
    )
        public;

    function disable(
        Wallet _wallet,
        Module _module
    )
        public;

    function isEnabled(
        Wallet _wallet,
        Module _module
    )
        public
        view
        returns (bool);

}