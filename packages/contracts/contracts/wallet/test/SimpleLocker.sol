pragma solidity ^0.5.8;

import "../modules/BaseModule.sol";
import "../limiters/LockLimiter.sol";

contract SimpleLocker is BaseModule {

    LockLimiter public limiter;

    constructor(LockLimiter _limiter) public {
        limiter = _limiter;
    }

    event LogData(address indexed _wallet, address indexed _limiter, bytes data);

    function lock(Wallet _wallet, uint64 _until) public {
        bytes memory data = abi.encodeWithSignature(
            "lock(address,address,uint64)",
            address(_wallet),
            address(this),
            _until
        );

        emit LogData(
            address(_wallet),
            address(limiter),
            data
        );

        _wallet.execute(address(limiter), data);
    }

    function unlock(Wallet _wallet) public {
        bytes memory data = abi.encodeWithSignature(
            "unlock(address,address)",
            address(_wallet),
            address(this)
        );

        _wallet.execute(address(limiter), data);
    }

    function allow(Wallet _wallet, bytes4 _prefix, address _address) public {
        bytes memory data = abi.encodeWithSignature(
            "allow(address,bytes4,address)",
            address(_wallet),
            _prefix,
            _address
        );

        _wallet.execute(address(limiter), data);
    }

    function disallow(Wallet _wallet, bytes4 _prefix, address _address) public {
        bytes memory data = abi.encodeWithSignature(
            "disallow(address,bytes4,address)",
            address(_wallet),
            _prefix,
            _address
        );

        _wallet.execute(address(limiter), data);
    }

    function doThing(Wallet _wallet) public {
        _wallet.execute(address(this), "");
    }

    function () external {

    }

}