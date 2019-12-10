pragma solidity ^0.5.8;

import "@openzeppelin/contracts/ownership/Ownable.sol";

import "./Proxy.sol";
import "./Wallet.sol";
import "./modules/LimitedModules.sol";
import "./limiters/MultiLimiter.sol";

contract Factory is Ownable {

    LimitedModules public modules;
    Delegates public delegates;
    MultiLimiter public multiLimiter;
    bytes public bytecode;

    event WalletCreated(
        address indexed wallet,
        address indexed owner
    );

    constructor(
        LimitedModules _modules,
        Delegates _delegates,
        MultiLimiter _multiLimiter,
        bytes memory _bytecode
    )
        public
    {
        modules = _modules;
        delegates = _delegates;
        multiLimiter = _multiLimiter;
        bytecode = _bytecode;
    }

    // TODO: limit who can call this function
    function createProxyWallet(
        address _owner,
        address[] memory _modules,
        Limiter[] memory _limiters
    )
        public
        returns (address payable proxy)
    {
        require(_owner != address(0), "owner must not be null");
        bytes32 salt = keccak256(abi.encodePacked(msg.sender, _owner, address(this)));
        bytes memory _code = bytecode;

        // solium-disable-next-line security/no-inline-assembly
        assembly {
            proxy := create2(0, add(_code, 0x20), mload(_code), salt)
            if iszero(extcodesize(proxy)) {
                revert(0, 0)
            }
        }

        Wallet wallet = Wallet(proxy);

        wallet.init(_owner, delegates, modules);
        modules.init(wallet, _modules, multiLimiter);
        multiLimiter.init(wallet, _limiters);

        emit WalletCreated(proxy, _owner);
        require(wallet.owner() == _owner, "wrong wallet owner");

    }

    function computeProxyWalletAddress(
        address _owner
    )
        public
        view
        returns (address proxy)
    {
        bytes32 salt = keccak256(abi.encodePacked(msg.sender, _owner, address(this)));
        bytes memory code = bytecode;

        bytes32 _data = keccak256(
            abi.encodePacked(
                bytes1(0xff),
                address(this),
                salt,
                code
            )
        );

        proxy = address(bytes20(_data << 96));
    }
}
