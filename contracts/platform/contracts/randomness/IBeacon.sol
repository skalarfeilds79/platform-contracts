pragma solidity 0.5.11;

contract IBeacon {

    function commit(uint256 _offset) public returns (uint256);
    function recommit(uint256 _commitBlock, uint256 _offset) public;
    function randomness(uint256 _commitBlock) public returns (bytes32);

}