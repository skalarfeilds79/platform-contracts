pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./IOracle.sol";

contract ManualOracle is Ownable, IOracle {

    using SafeMath for uint256;

    uint256 public _price = 205100000000000000000;

    function price() public view returns (uint256) {
        return _price;
    }

    function setPrice(
        uint256 value
    )
        public onlyOwner
    {
        _price = value;
    }

    function convert(
        uint8 from,
        uint8 to,
        uint256 amount
    )
        public
        view
        returns (uint256 returned)
    {
        require(
            from == 0 || from == 1,
            "ManualOracle: invalid from currency"
        );

        require(
            to == 0 || to == 1,
            "ManualOracle: invalid to currency"
        );

        // ETH = 0, USDCents = 1, ETH -> USD Cents
        if (from == 0 && to == 1) {
            return price().div(10**16).mul(amount);
        }

        // ETH = 0, USDCents = 1, USD Cents -> ETH
        if (from == 1 && to == 0) {
            return uint256(10**34).div(price()).mul(amount);
        }
    }

}