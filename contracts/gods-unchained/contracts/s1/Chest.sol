pragma solidity 0.5.11;

import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@imtbl/platform/contracts/token/TradeToggleERC20.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./Product.sol";

contract Chest is Product, TradeToggleERC20, Ownable {

    IPack public pack;

    constructor(
        IPack _pack, bytes32 _sku, uint256 _saleCap, uint _price,
        IReferral _referral, ICreditCardEscrow _escrow, IProcessor _pay
    ) public Product (_sku, _saleCap, _price, _referral, _escrow, _pay) {
        pack = _pack;
    }

    function open(uint count) public {
        _burn(msg.sender, count);
        pack.openChests(count);
    }

    /** @dev One way switch to enable trading */
    function makeTradable() external onlyOwner {
        require(!tradable, "must not be already tradable");
        tradable = true;
        event TradabilityChanged(true);
    }

}