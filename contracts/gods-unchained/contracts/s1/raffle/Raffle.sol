pragma solidity 0.5.11;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@imtbl/platform/contracts/token/TradeToggleERC20.sol";

contract Raffle is Ownable, TradeToggleERC20 {

    // Emitted when a minter's approval is changed
    event MinterApprovalChanged(address indexed minter, bool approval);

    // Records which contracts are approved to mint raffle tickets
    mapping(address => bool) public isApprovedMinter;

    constructor(string memory _name, string memory _symbol) public TradeToggleERC20(_name, _symbol, 0) {
        tradable = true;
    }

    function setMinterApproval(address _minter, bool _approval) public onlyOwner {
        isApprovedMinter[_minter] = _approval;
        emit MinterApprovalChanged(_minter, _approval);
    }

    function mint(address _user, uint256 _amount) public {
        require(
            isApprovedMinter[msg.sender],
            "S1:Raffle: must be approved minter"
        );
        _mint(_user, _amount);
    }

    /**
    * @dev One way switch to disable trading
    */
    function makeUntradable() external onlyOwner {
        require(
            tradable,
            "S1:Raffle: must be currently tradable"
        );
        tradable = false;
        emit TradabilityChanged(false);
    }

}