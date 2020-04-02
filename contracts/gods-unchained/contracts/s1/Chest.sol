pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@imtbl/platform/contracts/token/TradeToggleERC20.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./Product.sol";
import "./IPack.sol";
import "@imtbl/platform/contracts/escrow/IEscrow.sol";

contract Chest is Product, TradeToggleERC20, ERC20Burnable, Ownable {

    IPack public pack;

    struct Purchase {
        address user;
        uint256 count;
    }

    Purchase internal currentPurchase;

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
            _mint(msg.sender, qty);
        } else {
            // escrow the chests
            IEscrow.Vault memory vault = IEscrow.Vault({
                player: user,
                releaser: address(fiatEscrow),
                asset: address(this),
                balance: qty,
                lowTokenID: 0,
                highTokenID: 0,
                tokenIDs: new uint256[](0)
            });

            currentPurchase = Purchase({
                user: user,
                count: qty
            });

            bytes memory data = abi.encodeWithSignature("mintTokens()");

            fiatEscrow.escrow(vault, address(this), data, payment.escrowFor);
        }
    }

    function mintTokens() public {
        require(msg.sender == address(fiatEscrow.getProtocol()), "must be core escrow contract");
        _mint(currentPurchase.user, currentPurchase.count);
        delete currentPurchase;
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