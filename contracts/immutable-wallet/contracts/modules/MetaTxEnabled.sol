pragma solidity ^0.5.8;

import "../Wallet.sol";

contract MetaTxEnabled {

    mapping (address => mapping(bytes32 => bool)) public hashes;
    mapping (address => uint) public nonces;

    event TransactionExecuted(address indexed wallet, bool indexed success, bytes32 signedHash);

    modifier onlyRelayed {
        // TODO: address(this) being the caller doesn't guarantee this condition
        require(msg.sender == address(this), "must be a relayed transaction");
        _;
    }

    // Must be implemented by extending contract: allows completely
    // custom validation logic
    // TODO: Determine whether to keep this public or not
    function validateSignatures(
        Wallet _wallet, 
        bytes memory _data,
        uint _nonce,
        bytes memory _sigs, 
        uint  _gasPrice, 
        uint _gasLimit,
        bytes32 signHash
    ) public view returns (bool);

    function relay(
        Wallet _wallet,
        bytes calldata _data,
        uint256 _nonce,
        bytes calldata _sigs,
        uint256 _gasPrice,
        uint256 _gasLimit
    )
        external
        returns (bool success)
    {
        uint startGas = gasleft();
        bytes32 signHash = getSignHash(address(this), address(_wallet), 0, _data, _nonce, _gasPrice, _gasLimit);

        if (validateData(_wallet, _data)) {
            if (validateSignatures(_wallet, _data, _nonce, _sigs, _gasPrice, _gasLimit, signHash)) {
                if (validateNonce(_wallet, _nonce, signHash)) {
                    // solium-disable-next-line security/no-low-level-calls
                    (success,) = address(this).call(_data);
                    attemptRefund(_wallet, startGas - gasleft(), _gasPrice, _gasLimit, msg.sender);
                }
            }
        }
        emit TransactionExecuted(address(_wallet), success, signHash);
    }

    function getSignHash(
        address _from, 
        address _to, 
        uint256 _value,
        bytes memory _data, 
        uint256 _nonce,
        uint256 _gasPrice, 
        uint256 _gasLimit
    ) 
        public 
        pure 
        returns (bytes32)
    {
        return keccak256(
            abi.encodePacked(
                "\x19Ethereum Signed Message:\n32",
                keccak256(abi.encodePacked(
                    byte(0x19), byte(0), _from, _to, _value, _data, _nonce, _gasPrice, _gasLimit
                )
            )
        ));
    }

    function splitSignature(
        bytes memory _sigs, 
        uint _index
    ) 
        public 
        pure 
        returns (uint8 v, bytes32 r, bytes32 s) 
    {
        // r: jump 32 (0x20) as the first slot contains the length
        // s: jump 65 (0x41) per signature
        // v: load 32 bytes ending with v (the first 31 come from s) then mask
        uint offset = 0x41 * _index;
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            r := mload(add(_sigs, add(0x20, offset)))
            s := mload(add(_sigs, add(0x40, offset)))
            v := and(mload(add(_sigs, add(0x41, offset))), 0xff)
        }
        if (v < 27) {
            v += 27;
        }
        require(v == 27 || v == 28, "incorrect v value");
    }

    function recoverSigner(
        bytes32 _signedHash, 
        bytes memory _sigs, 
        uint _index
    ) 
        public 
        pure 
        returns (address) 
    {
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(_sigs, _index);
        return ecrecover(_signedHash, v, r, s);
    }

    function validateNonce(
        Wallet _wallet, 
        uint _nonce, 
        bytes32 _signHash
    ) 
        public 
        returns (bool) 
    {
        address wallet = address(_wallet);
        if (_nonce == 0) {
            require(!hashes[wallet][_signHash], "must be unique");
            hashes[wallet][_signHash] = true;
        } else {
            require(nonces[wallet] <= _nonce, "must have higher nonce");
            nonces[wallet] = _nonce;
        }
        return true;
    }

    function validateData(
        Wallet _wallet, 
        bytes memory _data
    ) 
        public 
        pure returns (bool) 
    {
        return extractWallet(_data) == address(_wallet);
    }

    function extractWallet(bytes memory _data) internal pure returns (address _wallet) {
        require(_data.length >= 36, "invalid wallet parameter in data");
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            _wallet := mload(add(_data, 0x24))
        }
    }

    function getPrefix(bytes memory _data) internal pure returns (bytes4 prefix) {
        require(_data.length >= 4, "invalid prefix");
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            prefix := mload(add(_data, 0x20))
        }
    }

    // 21000 (transaction) + 7620 (execution of refund) + 672 to log the event + _gasUsed
    uint256 public constant baseGasCost = 29292;

    function attemptRefund(Wallet _wallet, uint _gasUsed, uint _gasPrice, uint _gasLimit, address _relayer) internal {
        uint256 amount = baseGasCost + _gasUsed;
        // only refund if gas price not null, more than 1 signatures, gas less than gasLimit
        // do the number of signatures matter
        if (_gasPrice > 0 && amount <= _gasLimit) {
            if (_gasPrice > tx.gasprice) {
                amount *= tx.gasprice;
            } else {
                amount *= _gasPrice;
            }
            _wallet.executeValue(_relayer, "", amount);
        }
    }


}