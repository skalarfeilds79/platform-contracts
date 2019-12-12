pragma solidity ^0.5.8;

// solium-disable security/no-block-members

import "../limiters/LockLimiter.sol";
import "./BackupModule.sol";
import "../Wallet.sol";
import "./BaseModule.sol";
import "./MetaTxEnabled.sol";
import "../util/SafeMath.sol";
import "./BackupUtils.sol";

contract RecoveryModule is BaseModule, MetaTxEnabled {

    bytes4 constant RECOVERY_PREFIX = bytes4(keccak256("recover(address,address)"));
    bytes4 constant internal FINALIZE_PREFIX = bytes4(keccak256("finalize(address)"));
    bytes4 constant internal CANCEL_PREFIX = bytes4(keccak256("cancel(address)"));

    uint64 public recoveryPeriod;
    uint64 public lockPeriod;
    LockLimiter public lock;
    BackupModule public backups;

    mapping (address => State) public states;

    struct State {
        address recovery;
        uint64 delay;
        uint backupCount;
    }

    event RecoveryInitiated(
        address indexed wallet,
        address indexed recovery,
        uint64 delay
    );

    event RecoveryCancelled(
        address indexed wallet,
        address indexed recovery
    );

    event RecoveryFinalized(
        address indexed wallet,
        address indexed recovery
    );

    modifier onlyWhenRecovering(Wallet _wallet) {
        require(
            isRecovery(_wallet),
            "must be a live recovery"
        );
        _;
    }

    modifier notWhenRecovering(Wallet _wallet) {
        require(
            !isRecovery(_wallet),
            "must not be a live recovery"
        );
        _;
    }

    function isRecovery(Wallet _wallet) public view returns (bool) {
        return states[address(_wallet)].delay > 0;
    }

    constructor(
        LockLimiter _lock,
        BackupModule _backups,
        uint64 _recoveryPeriod,
        uint64 _lockPeriod
    )
        public
    {
        lock = _lock;
        backups = _backups;
        recoveryPeriod = _recoveryPeriod;
        lockPeriod = _lockPeriod;
    }

    function onEnabled(Wallet _wallet) public {
        // bytes memory data = abi.encodeWithSignature("addLimiter(address,address)", _wallet, address(lock));
        // _wallet.execute(data)
    }

    function recover(
        Wallet _wallet,
        address _recovery
    )
        public
        onlyRelayed
        notWhenRecovering(_wallet)
    {
        uint64 delay = uint64(now) + recoveryPeriod;
        states[address(_wallet)] = State({
            recovery: _recovery,
            delay: delay,
            backupCount: backups.count(_wallet)
        });

        emit RecoveryInitiated(address(_wallet), _recovery, delay);

        _wallet.execute(
            address(lock),
            abi.encodeWithSignature(
                "lock(address,address,uint64)",
                _wallet,
                address(this),
                lockPeriod
            )
        );
    }


    function finalize(
        Wallet _wallet
    )
        public
        onlyRelayed
        onlyWhenRecovering(_wallet)
    {
        State memory state = getState(_wallet);
        require(
            uint64(now) > state.delay,
            "must wait delay period"
        );

        emit RecoveryFinalized(address(_wallet), state.recovery);
        delete states[address(_wallet)];

        _wallet.execute(
            address(lock),
            abi.encodeWithSignature(
                "unlock(address,address)",
                _wallet, address(this)
            )
        );

        _wallet.execute(
            address(_wallet),
            abi.encodeWithSignature("changeOwner(address)", state.recovery)
        );
    }

    function cancel(Wallet _wallet) public onlyRelayed onlyWhenRecovering(_wallet) {
        address wallet = address(_wallet);
        State storage state = states[wallet];

        emit RecoveryCancelled(wallet, state.recovery);
        delete states[wallet];

        _wallet.execute(
            address(lock),
            abi.encodeWithSignature(
                "unlock(address,address)",
                _wallet,
                address(this)
            )
        );
    }

    function getState(
        Wallet _wallet
    )
        internal
        view
        returns (State memory)
    {
        return states[address(_wallet)];
    }

    function haveBackupsSigned(
        Wallet _wallet,
        bytes32 _signHash,
        bytes memory _sigs,
        uint required
    )
        internal
        view
        returns (bool)
    {
        address last = address(0);
        address[] memory bs = backups.getBackups(_wallet);
        bool isBackup;
        uint signatureCount = _sigs.length / 65;
        address owner = _wallet.owner();
        if (signatureCount < required) {
            return false;
        }
        for (uint i = 0; i < signatureCount; i++) {
            address signer = recoverSigner(_signHash, _sigs, i);
            // signatures must be in order
            if (signer <= last) {
                return false;
            }
            last = signer;
            // remove the backup from the array each time to ensure no duplicates/duplicate owners
            (isBackup, bs) = BackupUtils.isBackup(bs, signer);
            if (!isBackup && owner != signer) {
                return false;
            }
        }
        return true;
    }

    function validateSignatures(
        Wallet _wallet,
        bytes memory _data,
        uint,
        bytes memory _sigs,
        uint,
        uint,
        bytes32 _signHash
    ) public view returns (bool) {
        bytes4 methodID = getPrefix(_data);
        // can be called by anyone
        if (methodID == FINALIZE_PREFIX) {
            return true;
        } else if (methodID == RECOVERY_PREFIX || methodID == CANCEL_PREFIX) {
            uint threshold = SafeMath.ceil(backups.count(_wallet) + 1, 2);
            return haveBackupsSigned(_wallet, _signHash, _sigs, threshold);
        }
        return false;
    }

}