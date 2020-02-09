pragma solidity ^0.5.11;

import "../Asset.sol";

contract IEscrow {

    function escrowRange(
        Asset _asset,
        uint _low,
        uint _high,
        address _owner,
        address _releaser
    ) external returns (uint);

    /**
     * @dev Escrow a list of assets
     *
     * @param _asset NFT contract address of the assets to be escrowed
     * @param _ids Token IDs of the cards to be escrowed
     * @param _owner Address which will own these assets during escrow
     * @param _releaser Address which can release these assets from escrow
     */
    function escrowList(
        Asset _asset,
        uint[] calldata _ids,
        address _owner,
        address _releaser
    ) external returns (uint);

    function release(
        uint _id, 
        address _to
    ) external;

}