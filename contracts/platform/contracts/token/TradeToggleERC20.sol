pragma solidity 0.5.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TradeToggleERC20 is ERC20 {

    event TradabilityChanged(bool tradable);

    bool internal tradable;

    function transfer(address to, uint256 amount) public returns (bool) {
        require(isTradable(), "tokens are not currently tradable");
        return super.transfer(to, amount);
    }

    function transferFrom(address from, address to, uint256 amount) public returns (bool) {
        require(isTradable(), "tokens are not currently tradable");
        return super.transferFrom(from, to, amount);
    }

    function isTradable() public view returns (bool) {
        return tradable;
    }

    function _setTradability(bool _tradable) internal {
        tradable = _tradable;
        emit TradabilityChanged(tradable);
    }

}