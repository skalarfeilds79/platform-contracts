pragma solidity 0.5.11;

interface IERC721Agent {

    function ownsAny(address _asset, uint256 _low, uint256 _high) external returns (bool);

    function ownsAll(address _asset, uint256 _low, uint256 _high) external returns (bool);

}