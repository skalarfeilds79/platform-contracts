pragma solidity ^0.5.8;

import "./MetaTxEnabled.sol";
import "./BaseModule.sol";

contract OnlyOwnerModule is BaseModule, MetaTxEnabled {

    function validateSignatures(
        Wallet _wallet, bytes memory, uint,
        bytes memory _sigs, uint, uint,
        bytes32 _signHash
    ) public view returns (bool) {
        address signer = recoverSigner(_signHash, _sigs, 0);
        return _wallet.owner() == signer;
    }


}