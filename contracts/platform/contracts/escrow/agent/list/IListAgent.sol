pragma solidity 0.5.11;

interface IListAgent {

    function ownsAny(address _asset, uint256[] _tokenIDs) external returns (bool);

    function ownsAll(address _asset, uint256[] _tokenIDs) external returns (bool);

}