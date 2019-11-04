pragma solidity ^0.5.8;

library SafeMath {

    function ceil(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a / b;
        return (a % b == 0) ? c : c + 1;
    }

}