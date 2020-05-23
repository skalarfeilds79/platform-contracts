pragma solidity 0.5.11;

import "./IERC721Agent.sol";
import "./DefaultAgent.sol";

contract ImmutableBatchAgent is IBatchAgent, DefaultAgent {

    function ownsAny(address _asset, uint256 _low, uint256 _high) external view returns (bool) {
        uint256 next = IBatchToken(_asset).nextBatch();
        if (_low >= next) {
            return false;
        }
        return super.ownsAny(_asset, _low, _high);
    }

    function ownsAll(address _asset, uint256 _low, uint256 _high) external view returns (bool) {
        return super.ownsAll(_asset, _low, _high);
    }

}