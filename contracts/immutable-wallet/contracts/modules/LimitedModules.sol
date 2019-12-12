pragma solidity ^0.5.8;

import "./Modules.sol";
import "../limiters/Limiter.sol";
import "../control/Registry.sol";

contract LimitedModules is Modules {

    event ModuleEnabled(address indexed _wallet, address indexed _module);
    event ModuleDisabled(address indexed _wallet, address indexed _module);

    mapping (address => Limiter) limiters;
    Registry public moduleRegistry;

    mapping (address => mapping (address => bool)) modules;

    modifier onlyModule(Wallet _wallet) {
        require(
            modules[address(_wallet)][msg.sender],
            "Limited Modules: sender not a module"
        );
        _;
    }

    constructor(Registry _moduleRegistry) public {
        moduleRegistry = _moduleRegistry;
    }

    function init(
        Wallet _wallet,
        address[] memory _modules,
        Limiter _limiter
    )
        public
    {
        require(
            msg.sender == _wallet.creator(),
            "Limited Modules: must be set by factory"
        );

        limiters[address(_wallet)] = _limiter;

        require(
            _modules.length > 0,
            "Limited Modules: must provide some modules"
        );

        require(
            moduleRegistry.areRegistered(_modules),
            "Limited Modules: modules must be registered"
        );

        for (uint i = 0; i < _modules.length; i++) {
            _enable(_wallet, Module(_modules[i]));
        }
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
        Limiter limiter = limiters[address(_wallet)];
        if (address(limiter) == address(0)) {
            return isEnabled(_wallet, _sender);
        }
        bool can = limiter.canExecute(_wallet, _sender, _to, _data, _value);
        return isEnabled(_wallet, _sender) && can;
    }

    function enable(
        Wallet _wallet,
        Module _module
    )
        public
        onlyModule(_wallet)
    {
        require(
            !isEnabled(_wallet, _module),
            "Limited Modules: wallet must not be enabled"
        );

        _enable(_wallet, _module);
    }

    function _enable(
        Wallet _wallet,
        Module _module
    )
        internal
    {
        modules[address(_wallet)][address(_module)] = true;
        emit ModuleEnabled(address(_wallet), address(_module));
        _module.onEnabled(_wallet);
    }

    function disable(
        Wallet _wallet,
        Module _module
    )
        public
        onlyModule(_wallet)
    {
        require(
            isEnabled(_wallet, _module),
            "Limited Modules: wallet must be enabled"
        );

        modules[address(_wallet)][address(_module)] = false;
        emit ModuleDisabled(address(_wallet), address(_module));
        _module.onDisabled(_wallet);
    }

    function isEnabled(
        Wallet _wallet,
        Module _module
    )
        public
        view
        returns (bool)
    {
        return modules[address(_wallet)][address(_module)];
    }

}