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

    // The hash of the wallet contract
    bytes32 public contractCodeHash;

    // The code of the wallet contract
    bytes private contractCode;

    event WalletCreated(
        address indexed wallet,
        address indexed owner
    );

    constructor(
        LimitedModules _modules,
        Delegates _delegates,
        MultiLimiter _multiLimiter
    )
        public
    {
        modules = _modules;
        delegates = _delegates;
        multiLimiter = _multiLimiter;

        contractCode = type(Wallet).creationCode;
        contractCodeHash = keccak256(contractCode);
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
        proxy = createContract(salt);

        Wallet wallet = Wallet(proxy);

        wallet.init(_owner, delegates, modules);
        modules.init(wallet, _modules, multiLimiter);
        multiLimiter.init(wallet, _limiters);

        emit WalletCreated(proxy, _owner);
        require(wallet.owner() == _owner, "wrong wallet owner");

    }

    function createContract(bytes32 _salt)
        internal
        returns (address payable _contract)
    {
        bytes memory _contractCode = contractCode;

        // solium-disable-next-line security/no-inline-assembly
        assembly {
            let p := add(_contractCode, 0x20)
            let n := mload(_contractCode)
            _contract := create2(0, p, n, _salt)
            if iszero(extcodesize(_contract)) {revert(0, 0)}
        }
    }

    function computeContractAddress(address _owner)
        public
        view
        returns (address _contractAddress)
    {
        bytes32 salt = keccak256(abi.encodePacked(msg.sender, _owner, address(this)));

        bytes32 _data = keccak256(
            abi.encodePacked(
                bytes1(0xff),
                address(this),
                salt,
                contractCodeHash
            )
        );

        _contractAddress = address(bytes20(_data << 96));
    }
}
