pragma solidity 0.5.11;

contract ICards {

    function mintCards(address user, uint16[] memory protos, uint8[] memory qualities) public;
    function mintCards(address user, uint16 proto, uint8 quality) public;
    function nextBatch() public view returns (uint256);

}