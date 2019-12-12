pragma solidity ^0.5.8;

import "./BaseLimiter.sol";

contract MultiLimiter is BaseLimiter {

    event LimiterAdded(address indexed user, address indexed limiter);
    event LimiterRemoved(address indexed user, address indexed limiter);

    struct LimiterRef {
        bool exists;
        uint32 index;
    }

    mapping (address => Limiter[]) limiters;
    mapping (address => mapping (address => LimiterRef)) refs;

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
        Limiter[] memory userLimiters = limiters[address(_wallet)];
        for (uint i = 0; i < userLimiters.length; i++) {
            if (!userLimiters[i].canExecute(_wallet, _sender, _to, _data, _value)) {
                return false;
            }
        }
        return true;
    }

    function canChange(
        Wallet _wallet,
        Module _changer,
        address _changeTo
    )
        public
        returns (bool)
    {
        Limiter[] memory userLimiters = limiters[address(_wallet)];
        for (uint i = 0; i < userLimiters.length; i++) {
            if (!userLimiters[i].canChange(_wallet, _changer, _changeTo)) {
                return false;
            }
        }
        return true;
    }

    function init(
        Wallet _wallet,
        Limiter[] memory _limiters
    )
        public
    {
        require(msg.sender == _wallet.creator(), "must be sent by factory");
        require(limiters[address(_wallet)].length == 0, "must not have set limiters");
        for (uint i = 0; i < _limiters.length; i++) {
            _addLimiter(address(_wallet), _limiters[i]);
        }
    }

    function addLimiters(
        Wallet _wallet,
        Limiter[] memory _limiters
    )
        public
        onlyWalletOwner(_wallet)
    {
        for (uint i = 0; i < _limiters.length; i++) {
            addLimiter(_wallet, _limiters[i]);
        }
    }

    function addLimiter(
        Wallet _wallet,
        Limiter _limiter
    )
        public
        onlyWalletOwner(_wallet)
    {
        require(!isLimiter(address(_wallet), address(_limiter)), "already a limiter for this user");
        _addLimiter(address(_wallet), _limiter);
    }

    function _addLimiter(
        address _wallet,
        Limiter _limiter
    )
        internal
    {
        uint index = limiters[_wallet].push(Limiter(_limiter)) - 1;
        refs[_wallet][address(_limiter)] = LimiterRef({
            exists: true,
            index: uint32(index)
        });
        emit LimiterAdded(_wallet, address(_limiter));
    }

    function removeLimiters(
        Wallet _wallet,
        address[] memory _limiters
    )
        public
        onlyWalletOwner(_wallet)
    {
        for (uint i = 0; i < _limiters.length; i++) {
            removeLimiter(_wallet, _limiters[i]);
        }
    }

    function removeLimiter(
        Wallet _wallet,
        address _limiter
    )
        public
        onlyWalletOwner(_wallet)
    {
        address wallet = address(_wallet);
        require(isLimiter(wallet, _limiter), "not a limiter for this user");
        uint32 index = refs[wallet][_limiter].index;
        Limiter last = limiters[wallet][limiters[wallet].length - 1];
        refs[wallet][address(last)].index = index;
        limiters[wallet][index] = last;
        limiters[wallet].length--;
        delete refs[wallet][_limiter];
        emit LimiterRemoved(wallet, _limiter);
    }

    function isLimiter(
        address user,
        address limiter
    )
        public
        view
        returns (bool)
    {
        return refs[user][limiter].exists;
    }

    function areLimiters(
        address _user,
        address[] memory _limiters
    )
        public
        view
        returns (bool)
    {
        for (uint i = 0; i < _limiters.length; i++) {
            if (!isLimiter(_user, _limiters[i])) {
                return false;
            }
        }
        return true;
    }

}