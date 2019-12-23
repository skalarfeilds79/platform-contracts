pragma solidity ^0.5.8;

import "./interfaces/ERCProxy.sol";

contract ProxyData is ERCProxy {
    address public implementation;
    uint public constant proxyType = 1;
}