pragma solidity 0.5.11;

interface IBatchTransfer {

    function transferBatch(
        address from,
        address to,
        uint256 start,
        uint256 end
    ) external;

    function safeTransferBatch(
        address from,
        address to,
        uint256 start,
        uint256 end
    ) external;

}