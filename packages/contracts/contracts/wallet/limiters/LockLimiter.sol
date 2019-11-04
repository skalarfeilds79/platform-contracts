pragma solidity ^0.5.8;


// solium-disable security/no-block-members

import "./BaseLimiter.sol";

contract LockLimiter is BaseLimiter {

    bytes4 constant LOCK_PREFIX = bytes4(keccak256("lock(address,address,uint64)"));
    bytes4 constant UNLOCK_PREFIX = bytes4(keccak256("unlock(address,address)"));

    event FunctionStatusChanged(address indexed module, bytes4 prefix, bool value);
    event Locked(address indexed wallet, uint64 until);
    event Unlocked(address indexed wallet);

    struct State {
        uint64 until;
        address locker;
    }

    mapping (address => State) locks;

    mapping(address => mapping(bytes4 => bool)) alwaysAllowed;

    function lock(Wallet _wallet, address _locker, uint64 _duration) public onlyWallet(_wallet) {
        State storage state = locks[address(_wallet)];
        if (isLocked(_wallet)) {
            // only the active locker can change a lock's duration
            // _locker verified in canExecute
            require(state.locker == _locker, "must be the original locker");
        }
        uint64 until = uint64(now) + _duration;
        state.until = until;
        state.locker = _locker;
        emit Locked(address(_wallet), until);
    }

    function unlock(Wallet _wallet, address _unlocker) public onlyWallet(_wallet) {
        State memory state = locks[address(_wallet)];
        require(state.locker == _unlocker, "must be the original locker");
        delete locks[address(_wallet)];
        emit Unlocked(address(_wallet));
    }

    // TODO: unlock function
    function allow(Wallet _wallet, bytes4 prefix) public onlyWallet(_wallet) {
        _setAlwaysAllowed(_wallet, prefix, true);
    }

    function disallow(Wallet _wallet, bytes4 prefix) public onlyWallet(_wallet) {
        _setAlwaysAllowed(_wallet, prefix, false);
    }

    function _setAlwaysAllowed(Wallet _wallet, bytes4 _prefix, bool _value) internal {
        alwaysAllowed[address(_wallet)][_prefix] = _value;
        emit FunctionStatusChanged(address(_wallet), _prefix, _value);
    }

    function getPrefix(bytes memory _data) internal pure returns (bytes4 prefix) {
        if (_data.length >= 4) {
            return bytes4(0);
        }
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            prefix := mload(add(_data, 0x20))
        }
    }

    function isLocked(Wallet _wallet) public view returns (bool) {
        return locks[address(_wallet)].until > now;
    }

    function isAlwaysAllowed(Wallet wallet, bytes memory data) public view returns (bool) {
        bytes4 prefix = getPrefix(data);
        return alwaysAllowed[address(wallet)][prefix];
    }

    function extractLocker(bytes memory _data) internal pure returns (address _wallet) {
        require(_data.length >= (2 * 32) + 4, "invalid wallet parameter in data");
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            _wallet := mload(add(_data, 0x44))
        }
    }

    function isLockChange(Module _sender, bytes memory _data) public view returns (bool) {
        bytes4 prefix = getPrefix(_data);
        if (address(_sender) == address(this) && (prefix == LOCK_PREFIX || prefix == UNLOCK_PREFIX)) {
            return extractLocker(_data) == address(_sender);
        }
        return false;
    }

    function canExecute(
        Wallet _wallet,
        Module _sender,
        address _to,
        bytes memory _data,
        uint _value
    )
        public
        returns (bool)
    {
        return !isLocked(_wallet) || isAlwaysAllowed(_wallet, _data) || isLockChange(_sender, _data);
    }

    function canChange(
        Wallet _wallet,
        Module _changer,
        address _changeTo
    )
        public
        returns (bool)
    {
        // TODO: are there any other circumstances under which this might change
        return !isLocked(_wallet);
    }

}