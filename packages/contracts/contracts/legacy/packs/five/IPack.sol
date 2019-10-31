pragma solidity 0.5.11;

import "./Pack.sol";

interface IPack {

    function openChest(Pack.Type packType, address user, uint count) external returns (uint);

}