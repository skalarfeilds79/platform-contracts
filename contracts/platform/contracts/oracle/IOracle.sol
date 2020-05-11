pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

interface IOracle {

    function convert(
        uint8 from,
        uint8 to,
        uint256 amount
    )
        external
        view
        returns (uint256 returned);

}