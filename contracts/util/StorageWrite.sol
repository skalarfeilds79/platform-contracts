pragma solidity ^0.5.8;

// solium-disable security/no-inline-assembly

import "@openzeppelin/contracts/math/SafeMath.sol";

library StorageWrite {

    using SafeMath for uint256;

    function _getStorageArraySlot(uint _dest, uint _index) internal view returns (uint result) {
        uint slot = _getArraySlot(_dest, _index);
        assembly { result := sload(slot) }
    }

    function _getArraySlot(uint _dest, uint _index) internal pure returns (uint slot) {
        assembly {
            let free := mload(0x40)
            mstore(free, _dest)
            slot := add(keccak256(free, 32), _index)
        }
    }

    function _setArraySlot(uint _dest, uint _index, uint _value) internal {
        uint slot = _getArraySlot(_dest, _index);
        assembly { sstore(slot, _value) }
    }

    function _loadCurrentSlots(uint _slot, uint _offset, uint _perSlot, uint _length) internal view returns (uint[] memory slots) {
        uint slotCount = _slotCount(_length, _perSlot);
        slots = new uint[](slotCount);
        // top and tail the slots
        if (_offset.mod(_perSlot) != 0) {
            uint firstPos = _offset.div(_perSlot);
            slots[0] = _getStorageArraySlot(_slot, firstPos);
        }
        if (slotCount > 1) {
            uint lastPos = (_offset.add(_length)).div(_perSlot);
            slots[slotCount-1] = _getStorageArraySlot(_slot, lastPos);
        }
    }

    function _slotCount(uint items, uint perPage) internal pure returns (uint){
        return ((items - 1) / perPage) + 1;
    }

    function _writeUint16(uint[] memory _slots, uint _slotOffset, uint _size, uint _index, uint _value) internal pure {
        uint p = _index / 16;
        uint x = _index - (16 * p);
        if (_index < 16) {
            x += _slotOffset;
        }
        x *= 16;
        // evil bit shifting magic
        for (uint q = 0; q < _size; q += 8) {
            // uint q = (j * 8);
            _slots[p] |= ((_value >> q) & 0xFF) << (x + q);
        }
    }

    function _saveSlots(uint _slot, uint _offset, uint _size, uint[] memory _slots) internal {
        uint offset = _offset.div((256/_size));
        for (uint i = 0; i < _slots.length; i++) {
            _setArraySlot(_slot, offset+i, _slots[i]);
        }
    }

    // totally possible to generalize these further

    function uint16s(uint _slot, uint _offset, uint16[] memory _items) internal {

        uint[] memory slots = _loadCurrentSlots(_slot, _offset, 8, _items.length);
        uint initialOffset = _offset % 16;
        for (uint i = 0; i < _items.length; i++) {
            _writeUint16(slots, initialOffset, 16, i, _items[i]);
        }
        _saveSlots(_slot, _offset, 16, slots);
    }

    function uint8s(uint _slot, uint _offset, uint8[] memory _items) internal {

        uint[] memory slots = _loadCurrentSlots(_slot, _offset, 32, _items.length);
        uint initialOffset = _offset % 32;

        for (uint i = 0; i < _items.length; i++) {
            uint p = i / 32;
            uint x = i - (p * 32);
            if (i < 32) {
                x += initialOffset;
            }
            // evil bit shifting magic
            slots[p] |= uint(_items[i]) << (8 * x);
        }

        _saveSlots(_slot, _offset, 8, slots);
    }

}