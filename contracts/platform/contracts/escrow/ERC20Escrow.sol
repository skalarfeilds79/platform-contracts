pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./IERC20Escrow.sol";

contract ERC20Escrow is IERC20Escrow {

    using SafeMath for uint256;

    // Emitted when a vault is created
    event Escrowed(uint256 indexed vaultID, address indexed asset, address indexed releaser, address player, uint256 balance);
    // Emitted when a vault is destroyed
    event Released(uint256 indexed vaultID, address indexed to);

    // Every Escrow vault tracked by this contract
    Vault[] public vaults;
    // Mutex which protects escrow vault creation
    bool internal mutexLocked;

    /**
     * @dev Create a new escrow vault
     *
     * @param vault the escrow vault to be created
     * @param callbackTo the address to use for the callback transaction
     * @param callbackData the data to pass to the callback transaction
     */
    function callbackEscrow(
        Vault memory vault, address callbackTo, bytes memory callbackData
    ) public returns (uint256 vaultID) {
        require(!mutexLocked, "mutex must be unlocked");
        require(vault.balance > 0, "must have a non-zero balance");
        require(address(vault.asset) != address(0), "must be a non-null asset");
        require(vault.releaser != address(0), "must have a releaser");
        mutexLocked = true;
        uint256 preBalance = vault.asset.balanceOf(address(this));
        // solium-disable-next-line security/no-low-level-calls
        callbackTo.call(callbackData);
        uint256 postBalance = vault.asset.balanceOf(address(this));
        require(postBalance.sub(preBalance) == vault.balance, "must have transferred the tokens");
        mutexLocked = false;
        return vaults.push(vault) - 1;
    }

    /**
     * @dev Create a new escrow vault
     *
     * @param vault the escrow vault to be created
     * @param from the address from which to pull the tokens
     */
    function escrow(Vault memory vault, address from) public returns (uint256 vaultID) {
        require(!mutexLocked, "mutex must be unlocked");
        require(vault.balance > 0, "must have a non-zero balance");
        require(address(vault.asset) != address(0), "must be a non-null asset");
        require(vault.releaser != address(0), "must have a releaser");

        vault.asset.transferFrom(from, address(this), vault.balance);

        return vaults.push(vault) - 1;
    }

    function release(uint256 vaultID, address to) public {
        Vault memory vault = vaults[vaultID];
        require(vault.releaser == msg.sender, "must be the releaser");
        vault.asset.transfer(to, vault.balance);
        delete vaults[vaultID];
    }

}