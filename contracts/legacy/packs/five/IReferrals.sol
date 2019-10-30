pragma solidity 0.5.11;

interface IReferrals {

    function getSplit(address user) external view returns (uint8 discount, uint8 referrer);
        
}