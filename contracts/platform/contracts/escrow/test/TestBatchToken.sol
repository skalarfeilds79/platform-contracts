pragma solidity 0.5.11;

import "../../token/MultiTransfer.sol";
import "../../token/BatchToken.sol";

contract TestBatchToken is MultiTransfer, BatchToken {

    constructor(
        uint256 _batchSize
    )
        public
        BatchToken(_batchSize, "Test", "TEST")
    {

    }

    function mint(address to, uint16 count) external {
        _batchMint(to, count);
    }

}