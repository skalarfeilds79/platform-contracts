pragma solidity 0.5.11;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract S1Cap is Ownable {

    using SafeMath for uint256;

    // the cap enforced by this contract
    uint256 public cap;
    // the current progression towards that cap
    uint256 public current;
    // whether an addres can contribute to that cap
    mapping(address => bool) public canUpdate;

    constructor(uint256 _cap) public {
        cap = _cap;
    }

    /** @dev Update the current progression towards the cap
     *
     * @param _increase the amount to contribute towards the cap
     */
    function update(uint256 _increase) external {
        require(canUpdate[msg.sender], "GU:S1Cap: must be approved updater");
        require(current.add(_increase) <= cap, "GU:S1Cap: must not exceed cap");
        current = current.add(_increase);
    }

    /** @dev Change whether certain addresses can contribute toward the cap
     *
     * @param _addresses the addresses to modify
     * @param _can whether the addresses should be able to contribute to the cap
     */
    function setCanUpdate(address[] calldata _addresses, bool _can) external onlyOwner {
        for (uint i = 0; i < _addresses.length; i++) {
            canUpdate[_addresses[i]] = _can;
        }
    }

}