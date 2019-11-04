pragma solidity ^0.5.8;

import "../Wallet.sol";

contract WalletAware {

    modifier onlyWallet(Wallet _wallet) {
        require(msg.sender == address(_wallet), "wallet must initiate action directly");
        _;
    }

}