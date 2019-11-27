pragma solidity ^0.5.8;

// solium-disable security/no-block-members

import "./BaseModule.sol";
import "./MetaTxEnabled.sol";
import "./BackupUtils.sol";

contract BackupModule is BaseModule, MetaTxEnabled {

    struct State {
        address[] backups;
        mapping (address => Details) details;
    }

    struct Details {
        bool exists;
        uint64 index;
        uint64 pendingAddition;
        uint64 pendingRemoval;
    }

    mapping (address => State) states;
    uint64 public securityPeriod;
    uint64 public securityWindow;

    event BackupAdded(address indexed wallet, address indexed backup);
    event BackupRemoved(address indexed wallet, address indexed backup);

    event BackupAdditionRequested(address indexed wallet, address indexed backup, uint64 delay);
    event BackupAdditionCancelled(address indexed wallet, address indexed backup);

    event BackupRemovalRequested(address indexed wallet, address indexed backup, uint64 delay);
    event BackupRemovalCancelled(address indexed wallet, address indexed backup);

    event RecoveryExecuted(address indexed wallet, address indexed recovery, uint64 delay);
    event RecoveryCancelled(address indexed wallet, address indexed recovery);
    event RecoveryFinalised(address indexed wallet, address indexed recovery);

    constructor(uint64 _securityPeriod, uint64 _securityWindow) public {
        securityPeriod = _securityPeriod;
        securityWindow = _securityWindow;
    }

    function getWalletOwner(Wallet _wallet) public view returns (address) {
        return _wallet.owner();
    }

    function addBackup(Wallet _wallet, address _backup) public onlyWalletOwner(_wallet) {
        require(_wallet.owner() != _backup, "backup cannot be owner");
        require(!isBackup(_wallet, _backup), "target is already a backup");
        // Must be an EOA or a contract with an owner() --> address with a 5000 gas stipend.
        // This can be bypassed by custom malicious contracts.
        // solium-disable-next-line security/no-low-level-calls
        (bool success,) = _backup.call.gas(5000)(abi.encodeWithSignature("owner()"));
        require(success, "GM: guardian must be EOA or implement owner()");
        if (count(_wallet) == 0) {
            _addBackup(address(_wallet), _backup);
        } else {
            address wallet = address(_wallet);
            uint addTime = states[wallet].details[_backup].pendingAddition;
            require(_isNotPending(addTime), "cannot add backup: already pending");
            uint64 delay = uint64(now) + securityPeriod;
            states[wallet].details[_backup].pendingAddition = delay;
            emit BackupAdditionRequested(wallet, _backup, delay);
        }
    }

    function addBackups(Wallet _wallet, address[] memory _backups) public onlyWalletOwner(_wallet) {
        for (uint i = 0; i < _backups.length; i++) {
            addBackup(_wallet, _backups[i]);
        }
    }

    function removeBackup(Wallet _wallet, address _backup) public onlyWalletOwner(_wallet) {
        address wallet = address(_wallet);
        uint removalTime = states[wallet].details[_backup].pendingRemoval;
        require(_isNotPending(removalTime), "cannot remove backup: already pending");
        uint64 delay = uint64(now) + securityPeriod;
        states[wallet].details[_backup].pendingRemoval = delay;
        emit BackupRemovalRequested(wallet, _backup, delay);
    }

    function removeBackups(Wallet _wallet, address[] memory _backups) public onlyWalletOwner(_wallet) {
        for (uint i = 0; i < _backups.length; i++) {
            removeBackup(_wallet, _backups[i]);
        }
    }

    function confirmBackupAddition(Wallet _wallet, address _backup) public {
        address wallet = address(_wallet);
        uint addTime = states[wallet].details[_backup].pendingAddition;
        require(_isWithinBoundaries(addTime), "cannot confirm: outside window");
        _addBackup(wallet, _backup);
    }

    function confirmBackupAdditions(Wallet _wallet, address[] memory _backups) public {
        for (uint i = 0; i < _backups.length; i++) {
            confirmBackupAddition(_wallet, _backups[i]);
        }
    }

    function cancelBackupAddition(Wallet _wallet, address _backup) public {
        address wallet = address(_wallet);
        require(states[wallet].details[_backup].pendingAddition > 0, "no currently pending addition");
        states[wallet].details[_backup].pendingAddition = 0;
        emit BackupAdditionCancelled(wallet, _backup);
    }

    function cancelBackupAdditions(Wallet _wallet, address[] memory _backups) public onlyWalletOwner(_wallet) {
        for (uint i = 0; i < _backups.length; i++) {
            cancelBackupAddition(_wallet, _backups[i]);
        }
    }

    function confirmBackupRemoval(Wallet _wallet, address _backup) public {
        address wallet = address(_wallet);
        uint removalTime = states[wallet].details[_backup].pendingRemoval;
        require(_isWithinBoundaries(removalTime), "cannot confirm: outside window");
        _removeBackup(wallet, _backup);
    }

    function confirmBackupRemovals(Wallet _wallet, address[] memory _backups) public {
        for (uint i = 0; i < _backups.length; i++) {
            confirmBackupRemoval(_wallet, _backups[i]);
        }
    }

    function cancelBackupRemoval(Wallet _wallet, address _backup) public onlyWalletOwner(_wallet) {
        address wallet = address(_wallet);
        require(states[wallet].details[_backup].pendingRemoval > 0, "");
        states[wallet].details[_backup].pendingRemoval = 0;
        emit BackupRemovalCancelled(wallet, _backup);
    }

    function cancelBackupRemovals(Wallet _wallet, address[] memory _backups) public onlyWalletOwner(_wallet) {
        for (uint i = 0; i < _backups.length; i++) {
            confirmBackupRemoval(_wallet, _backups[i]);
        }
    }

    function count(Wallet _wallet) public view returns (uint) {
        return states[address(_wallet)].backups.length;
    }

    function _addBackup(address _wallet, address _backup) internal {
        State storage state = states[_wallet];
        uint64 index = uint64(state.backups.push(_backup) - 1);
        state.details[_backup] = Details({
            exists: true,
            index: index,
            pendingAddition: 0,
            pendingRemoval: 0
        });
        emit BackupAdded(_wallet, _backup);
    }

    function _removeBackup(address _wallet, address _backup) internal {
        State storage state = states[_wallet];
        uint64 targetIndex = state.details[_backup].index;
        address last = state.backups[state.backups.length - 1];
        if (last != _backup) {
            state.backups[targetIndex] = last;
            state.details[last].index = targetIndex;
        }
        state.backups.length--;
        delete state.details[_backup];
        emit BackupRemoved(_wallet, _backup);
    }

    function _isNotPending(uint time) internal view returns (bool) {
        return (time == 0) || (now > time + securityPeriod);
    }

    function _isWithinBoundaries(uint time) internal view returns (bool) {
        return (time > 0) && (time < now) && (now < time + securityWindow);
    }

    function getBackups(Wallet _wallet) public view returns (address[] memory) {
        return states[address(_wallet)].backups;
    }

    function isBackup(Wallet _wallet, address _backup) public view returns (bool isB) {
        (isB, ) = BackupUtils.isBackup(states[address(_wallet)].backups, _backup);
    }

    bytes4 constant internal CONFIRM_ADD_PREFIX = bytes4(keccak256("confirmBackupAddition(address,address)"));
    bytes4 constant internal CONFIRM_REMOVE_PREFIX = bytes4(keccak256("confirmBackupRemoval(address,address)"));

    function validateSignatures(
        Wallet _wallet, bytes memory _data, uint,
        bytes memory _sigs, uint, uint,
        bytes32 _signHash
    ) internal view returns (bool) {
        bytes4 methodID = getPrefix(_data);
        // can be called by anyone
        if (methodID == CONFIRM_ADD_PREFIX || methodID == CONFIRM_REMOVE_PREFIX) {
            return true;
        }
        // the first MUST be the wallet owner
        address signer = recoverSigner(_signHash, _sigs, 0);
        return _wallet.owner() == signer;
    }

}