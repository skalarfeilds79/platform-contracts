pragma solidity ^0.5.8;

import "../Wallet.sol";

contract Delegates {

    function register(
        bytes4 _prefix,
        address _to
    )
        public;

    function getDelegate(
        Wallet _wallet,
        bytes4 _prefix,
        bytes memory _data,
        uint _value,
        address _sender
    )
        public
        returns (address);

    function init()
        public;

}