pragma solidity ^0.5.8;

// solium-disable security/no-inline-assembly

library BackupUtils {

    function isBackup(address[] memory _backups, address _backup) internal view returns (bool, address[] memory) {
        if (_backups.length == 0 || _backup == address(0)) {
            return (false, _backups);
        }
        for (uint256 i = 0; i < _backups.length; i++) {
            bool isDirectBackup = _backup == _backups[i];
            bool isBackupOwner = isContract(_backups[i]) && isBackupOwner(_backups[i], _backup);
            if (isDirectBackup || isBackupOwner) {
                _backups[i] = _backups[_backups.length - 1];
                // decrement array length, we've already checked for no size
                assembly { mstore(_backups, sub(mload(_backups), 1)) }
                return (true, _backups);
            }
        }
        return (false, _backups);
    }

    function isContract(address _addr) internal view returns (bool) {
        uint32 size;
        assembly { size := extcodesize(_addr) }
        return (size > 0);
    }

    function isBackupOwner(address _backup, address _owner) internal view returns (bool) {
        address owner = address(0);
        bytes4 sig = bytes4(keccak256("owner()"));
        assembly {
            let ptr := mload(0x40)
            mstore(ptr, sig)
            let result := staticcall(5000, _backup, ptr, 0x20, ptr, 0x20)
            if eq(result, 1) {
                owner := mload(ptr)
            }
        }
        return owner == _owner;
    }

}