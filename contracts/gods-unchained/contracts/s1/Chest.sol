pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@imtbl/platform/contracts/token/TradeToggleERC20.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./Product.sol";
import "./IPack.sol";
import "@imtbl/platform/contracts/escrow/IERC20Escrow.sol";

contract Chest is Product, TradeToggleERC20, ERC20Burnable, Ownable {

    IPack public pack;

    struct Purchase {
        address user;
        uint256 count;
    }

    mapping(uint256 => Purchase) internal purchases;

    uint IDTracker;

    constructor(
        string memory name, string memory symbol, uint8 decimals,
        IPack _pack, bytes32 _sku, uint256 _saleCap, uint _price,
        IReferral _referral, ICreditCardEscrow _escrow, IPay _pay
    ) public Product(_sku, _saleCap, _price, _referral, _escrow, _pay) TradeToggleERC20(name, symbol, decimals) {
        require(address(_pack) != address(0), "pack must be set");
        pack = _pack;
    }

    function purchaseFor(
        address user, uint256 qty, address payable referrer, IPay.Payment memory payment
    ) public {
        super.purchaseFor(user, qty, referrer, payment);
        if (payment.currency == IPay.Currency.ETH) {
            _mintTokens(msg.sender, qty);
        } else {
            // escrow the chests
            IERC20Escrow.Vault memory vault = IERC20Escrow.Vault({
                player: user,
                releaser: address(fiatEscrow),
                asset: IERC20(address(this)),
                balance: qty
            });

            uint id = IDTracker++

            purchases[id] = Purchase({
                user: user,
                count: count
            });

            bytes memory data = abi.encodeWithSignature("mintTokens(uint256)", id);

            fiatEscrow.escrowERC20(vault, payment.receipt.details.requiredEscrowPeriod, );
        }
    }

    function mintTokens(address user, uint256 count) public {
        require(msg.sender == fiatEscrow.escrowCore(), "must be core escrow contract");
        Purchase memory purchase = purchases[id];
        _mint(purchase.user, purchase.count);
        delete purchase[id];
    }

    function open(uint count) public {
        _burn(msg.sender, count);
        pack.openChests(msg.sender, count);
    }

    /** @dev One way switch to enable trading */
    function makeTradable() external onlyOwner {
        require(!tradable, "must not be already tradable");
        tradable = true;
        emit TradabilityChanged(true);
    }

}