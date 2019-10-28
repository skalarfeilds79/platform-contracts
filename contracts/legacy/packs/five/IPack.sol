pragma solidity ^0.5.0;

import "./Pack.sol";

interface IPack {

    function openChest(Pack.Type packType, address user, uint count) external returns (uint);

}