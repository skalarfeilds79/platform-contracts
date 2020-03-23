pragma solidity 0.5.11;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract Referral {

    using SafeMath for uint256;

    function getSplit(
        address user, uint256 value, address referrer
    ) external view returns (
        uint256 toVendor, uint256 toReferrer
    ) {
        toVendor = getVendorPercentage(value, 90);
        toReferrer = getReferrerPercentage(value, 10);
        require(toVendor.add(toReferrer) == value, "wrong sum value");
        return (toVendor, toReferrer);
    }

    function getVendorPercentage(uint amount, uint8 percentage) public pure returns (uint) {
        return halfUpDiv(amount.mul(percentage), 100);
    }

    function getReferrerPercentage(uint amount, uint8 percentage) public pure returns (uint) {
        return moreThanHalfUpDiv(amount.mul(percentage), 100);
    }

    function moreThanHalfUpDiv(uint256 a, uint256 b) internal pure returns (uint256) {
        return (a % b > _halfDenom(b)) ? a.div(b).add(1) : a.div(b);
    }

    function halfUpDiv(uint256 a, uint256 b) internal pure returns (uint256) {
        return (a % b >= _halfDenom(b)) ? a.div(b).add(1) : a.div(b);
    }

    function _halfDenom(uint256 b) internal pure returns (uint256) {
        require(b > 0, "div by 0");
        return (b % 2 == 0) ? b.div(2) : (b.div(2)).add(1);
    }

}