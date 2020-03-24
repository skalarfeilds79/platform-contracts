pragma solidity 0.5.11;

interface IReleasable {

    function release(uint256 vaultID, address to) external;
    
}