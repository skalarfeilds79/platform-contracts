pragma solidity ^0.5.8;

import "../modules/MetaTxEnabled.sol";

contract SimpleMeta is MetaTxEnabled {

    function validateSignatures(
        Wallet, bytes memory, uint,
        bytes memory, uint, uint,
        bytes32
    ) internal view returns (bool) {
        return true;
    }

    function publicExtractWallet(bytes memory _data) public pure returns (address _wallet) {
        return extractWallet(_data);
    }

}