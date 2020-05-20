pragma solidity 0.5.11;

contract IBeacon {

    function commit(uint256 _offset) external returns (uint256);
    function recommit(uint256 _commitBlock, uint256 _offset) external;
    function randomness(uint256 _commitBlock) external returns (bytes32);

}