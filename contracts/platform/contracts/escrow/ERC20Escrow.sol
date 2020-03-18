pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract ERC20Escrow {

    using SafeMath for uint256;

    // Emitted when a vault is created
    event Escrowed(uint256 indexed vaultID, address indexed asset, address indexed releaser, address player, uint256 balance);
    // Emitted when a vault is destroyed
    event Released(uint256 indexed vaultID, address indexed to);

    struct ERC20Vault {
        address player;
        address releaser;
        IERC20 asset;
        uint256 balance;
    }

    // Every Escrow vault tracked by this contract
    ERC20Vault[] public vaults;

    /**
     * @dev Create a new escrow vault
     *
     * @param vault the escrow vault to be created
     */
    function escrow(ERC20Vault memory vault, address from) public returns (uint256 vaultID) {
        require(vault.balance > 0, "must have a non-zero balance");
        require(address(vault.asset) != address(0), "must be a non-null asset");
        require(vault.releaser != address(0), "must have a releaser");

        vault.asset.transferFrom(from, address(this), vault.balance);

        return vaults.push(vault) - 1;
    }

    function release(uint256 vaultID, address to) public {
        ERC20Vault memory vault = vaults[vaultID];
        require(vault.releaser == msg.sender, "must be the releaser");
        vault.asset.transfer(to, vault.balance);
        delete vaults[vaultID];
    }

}