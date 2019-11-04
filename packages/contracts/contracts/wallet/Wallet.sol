pragma solidity ^0.5.8;

import "./delegates/Delegates.sol";
import "./modules/Modules.sol";
import "./ProxyData.sol";
import "./modules/Module.sol";

contract Wallet is ProxyData {

    address public owner;
    Modules public modules;
    Delegates public delegates;
    address public creator;
    uint64 public creationTime;

    event Received(
        address indexed sender,
        bytes data,
        uint value
    );

    event Executed(
        address indexed sender,
        address indexed to,
        bytes data,
        uint value
    );

    event OwnerChanged(address indexed owner);

    event ModulesChanged(address indexed modules);

    event DelegatesChanged(address indexed delegates);

    modifier onlySelf {
        require(
            msg.sender == address(this),
            "must be called by this contract"
        );
        _;
    }

    function changeOwner(address _owner) public onlySelf {
        require(
            _owner != address(0),
            "Address must not be null"
        );

        owner = _owner;
        emit OwnerChanged(_owner);
    }

    function changeModules(Modules _modules) public onlySelf {
        require(
            address(_modules) != address(0),
            "Address must not be null"
        );

        modules = _modules;
        emit ModulesChanged(address(_modules));
    }

    function changeDelegates(Delegates _delegates) public onlySelf {
        require(
            address(_delegates) != address(0),
            "Address must not be null"
        );

        delegates = _delegates;
        emit ModulesChanged(address(_delegates));
    }

    function init(
        address _owner,
        Delegates _delegates,
        Modules _modules
    )
        public
    {
        require(
            owner == address(0),
            "can only init once"
        );

        require(
            _owner != address(0),
            "owner cannot be null"
        );

        require(
            address(_modules) != address(0),
            "modules canot be null"
        );

        require(
            address(_delegates) != address(0),
            "delegates cannot be null"
        );

        owner = _owner;
        delegates = _delegates;
        modules = _modules;
        creator = msg.sender;
        creationTime = uint64(now);
    }

    function executeValue(
        address _to,
        bytes memory _data,
        uint _value
    )
        public
    {
        require(
            modules.canExecute(
                this,
                Module(msg.sender),
                _to,
                _data,
                _value
            ),
            "sender not authorised for this operation"
        );
        // solium-disable-next-line security/no-call-value
        (bool success, ) = _to.call.value(_value)(_data);
        require(success, "execution unsuccessful");
        emit Executed(msg.sender, _to, _data, _value);
    }

    function execute(address _to, bytes memory _data) public {
        executeValue(_to, _data, 0);
    }

    function register(bytes4 _function, address _to) public {
        execute(
            address(delegates),
            abi.encodeWithSignature(
                "register(address,bytes4,address)",
                address(this),
                _function,
                _to
            )
        );
    }

    function () external payable {
        address delegate = delegates.getDelegate(
            this,
            msg.sig,
            msg.data,
            msg.value,
            msg.sender
        );

        // solium-disable-next-line security/no-inline-assembly
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := staticcall(gas, delegate, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 {revert(0, returndatasize())}
            default {return (0, returndatasize())}
        }

    }

}