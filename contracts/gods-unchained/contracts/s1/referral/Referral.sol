pragma solidity 0.5.11;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract Referral {

    using SafeMath for uint256;

    function getSplit(
        address user, uint256 value, address referrer
    ) external view returns (
        uint256 toVendor, uint256 toReferrer
    ) {
        toVendor = getPercentage(value, 90);
        toReferrer = getPercentage(value, 10);
        require(toVendor.add(toReferrer) == value, "wrong sum value");
        return (toVendor, toReferrer);
    }

    function getPercentage(uint amount, uint8 percentage) public pure returns (uint) {
        return amount.mul(percentage).div(100);
    }

}