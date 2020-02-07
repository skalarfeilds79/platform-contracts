pragma solidity ^0.6.1;

contract IEscrow {

    function escrowRange(
        Asset _asset,
        uint _low,
        uint _high,
        address _owner,
        address _releaser
    ) public returns (uint);

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
        uint[] _ids,
        address _owner,
        address _releaser
    ) public returns (uint);

}