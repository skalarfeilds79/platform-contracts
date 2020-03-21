pragma solidity 0.5.11;

import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@imtbl/platform/contracts/token/TradeToggleERC20.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract Chest is TradeToggleERC20, Ownable {

    IPack public pack;

    constructor(IPack _pack) public {
        pack = _pack;
    }

    function open(uint count) public {
        pack.openChests(count);
    }

    /** @dev One way switch to enable trading */
    function makeTradable() external onlyOwner {
        require(!tradable, "must not be already tradable");
        tradable = true;
    }

}