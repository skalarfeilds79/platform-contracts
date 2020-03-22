pragma solidity 0.5.11;

interface ICards {

    function mintCards(address user, uint16[] memory protos, uint8[] memory qualities) external;
    function mintCards(address user, uint16 proto, uint8 quality) external;
    function nextBatch() external view returns (uint256);

}