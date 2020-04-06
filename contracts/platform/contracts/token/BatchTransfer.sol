pragma solidity 0.5.11;

interface BatchTransfer {

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