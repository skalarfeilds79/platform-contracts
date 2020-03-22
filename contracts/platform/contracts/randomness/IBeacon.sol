pragma solidity 0.5.11;

contract IBeacon {

    function commit(uint256 offset) public;
    function recommit(uint256 commitBlock, uint256 offset) public;
    function randomness(uint64 commitBlock) public view returns (bytes32);
    function callback(uint256 commitBlock) public;

}