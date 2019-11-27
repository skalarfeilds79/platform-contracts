pragma solidity ^0.5.11;

import "./BaseModule.sol";
import "./MetaTxEnabled.sol";

contract PurchaseModule is BaseModule, MetaTxEnabled {

    function fillOrders() public {

    }

    function validateSignatures(
        Wallet _wallet,
        bytes memory _data,
        uint,
        bytes memory _sigs,
        uint,
        uint,
        bytes32 _signHash
    ) internal view returns (bool) {
        address signer = recoverSigner(_signHash, _sigs, 0);
        return _wallet.owner() == signer;
    }

}