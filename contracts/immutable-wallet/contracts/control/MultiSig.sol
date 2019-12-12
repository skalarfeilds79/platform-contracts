pragma solidity ^0.5.8;

contract MultiSig {

    uint public nonce;
    uint public threshold;
    uint public numOwners;
    mapping (address => bool) owners;

    event OwnerAdded(address indexed owner);
    event OwnerRemoved(address indexed owner);
    event ThresholdChanged(uint indexed threshold);
    event Executed(address indexed destination, uint indexed value, bytes data);
    event Received(uint indexed value, address indexed from);

    modifier onlySelf() {
        require (msg.sender == address(this), "can only be called by the wallet itself");
        _;
    }

    constructor(address[] memory _owners, uint _threshold) public {
        require(_owners.length > 0, "wrong amount of owners");
        require(_threshold > 0 && _threshold <= _owners.length, "invalid threshold");
        numOwners = _owners.length;
        threshold = _threshold;
        for(uint i = 0; i < _owners.length; i++) {
            _addOwner(_owners[i]);
        }
    }

    function execute(address _to, uint _value, bytes memory _data, bytes memory _sigs) public {
        uint count = _sigs.length / 65;
        require(count >= threshold, "not enough signatures");
        bytes32 txHash = keccak256(abi.encodePacked(byte(0x19), byte(0), address(this), _to, _value, _data, nonce));
        nonce++;
        uint valid;
        address last = address(0);
        for (uint i = 0; i < count; i++) {
            (uint8 v, bytes32 r, bytes32 s) = splitSignature(_sigs, i);
            address recovered = ecrecover(
                keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32",txHash)),
                v,
                r,
                s
            );
            require(recovered > last, "badly ordered signatures");
            last = recovered;
            if (isOwner(recovered)) {
                valid++;
            }
        }
        require(valid >= threshold, "not enough valid signatures");
        // solium-disable-next-line security/no-call-value
        (bool success,) = _to.call.value(_value)(_data);
        require(success, "external call failed");
        emit Executed(_to, _value, _data);
        return;
    }

    function addOwner(address _owner) public onlySelf {
        require(!isOwner(_owner), "must not be an owner");
        numOwners++;
        _addOwner(_owner);
    }

    function _addOwner(address _owner) internal {
        owners[_owner] = true;
        emit OwnerAdded(_owner);
    }

    function removeOwner(address _owner) public onlySelf {
        require(isOwner(_owner), "must be an owner");
        owners[_owner] = false;
        emit OwnerRemoved(_owner);
    }

    function isOwner(address _owner) public view returns (bool) {
        return owners[_owner];
    }

    function splitSignature(bytes memory _sigs, uint _index) internal pure returns (uint8 v, bytes32 r, bytes32 s) {
        // r: jump 32 (0x20) as the first slot contains the length
        // s: jump 65 (0x41) per signature
        // v: load 32 bytes ending with v (the first 31 come from s) then mask
        uint offset = 0x41 * _index;
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            r := mload(add(_sigs, add(0x20,offset)))
            s := mload(add(_sigs, add(0x40,offset)))
            v := and(mload(add(_sigs, add(0x41,offset))), 0xff)
        }
        require(v == 27 || v == 28, "incorrect v value");
    }

    function () external payable {
        emit Received(msg.value, msg.sender);
    }

}