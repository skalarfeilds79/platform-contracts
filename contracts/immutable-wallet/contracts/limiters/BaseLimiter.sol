pragma solidity ^0.5.8;

import "./Limiter.sol";

contract BaseLimiter is Limiter {

    modifier onlyWallet(Wallet _wallet) {
        require(isSender(address(_wallet)), "must be invoked by wallet itself");
        _;
    }

    function isSender(address _sender) internal view returns (bool) {
        return msg.sender == _sender;
    }

    modifier onlyWalletOwner(Wallet _wallet) {
        require(
            isSender(address(this)) ||
            isSender(_wallet.owner()) ||
            isSender(address(_wallet)),
            "Base Limiter: must be wallet"
        );
        _;
    }

    function onEnabled(Wallet _wallet) public {

    }

    function onDisabled(Wallet _wallet) public {

    }

}