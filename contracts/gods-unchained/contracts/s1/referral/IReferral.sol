pragma solidity 0.5.11;

interface IReferral {

    function getSplit(
        address user, uint256 value, address referrer
    ) external view returns (
        uint256 toVendor, uint256 toReferrer
    );

}