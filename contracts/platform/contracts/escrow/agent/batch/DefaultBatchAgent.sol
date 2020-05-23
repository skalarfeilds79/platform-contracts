pragma solidity 0.5.11;

contract DefaultBatchAgent {

    function ownsAny(address _asset, uint256 _low, uint256 _high) external returns (bool) {
        for (uint i = _low; i < _high; i++) {
            if (_existsAndEscrowed(_asset, i)) {
                return true;
            }
        }
    }

    function ownsAll(address _asset, uint256 _low, uint256 _high) external returns (bool) {
        for (uint i = _low; i < _high; i++) {
            if (IERC721(_asset).ownerOf(i) != address(this)) {
                return false;
            }
        }
    }

    function _existsAndEscrowed(address _asset, uint256 _tokenID) internal returns (bool) {
        bytes memory data = abi.encodeWithSignature("ownerOf(uint256)", _tokenID);
        // solium-disable-next-line security/no-low-level-calls
        (bool success, bytes memory response) = _asset.call(data);
        if (success) {
            address owner;
            // solium-disable-next-line security/no-inline-assembly
            assembly { owner := mload(add(response, 20)) }
            if (owner == address(this)) {
                return true;
            }
        }
        return false;
    }

}