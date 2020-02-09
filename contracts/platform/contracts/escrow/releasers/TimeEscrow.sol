pragma solidity ^0.6.1;

/**
 * @title TimeEscrow
 * @notice A time-based escrow service for Immutable Escrow.
 * @author Immutable
 */
contract TimeEscrow {

    // Emitted when assets are escrowed
    event Escrowed(uint indexed id, uint64 endBlock);
    // Emitted when assets are released from escrow
    event Released(uint indexed id);

    struct Lock {
        uint64 endBlock;
        address releaseTo;
    }

    IEscrow public escrow;
    mapping(uint => Lock) public locks;

    constructor(IEscrow _escrow) public {
        escrow = _escrow;
    }

    /**
     * @dev Release all assets from an escrow account
     *
     * @param _id The ID of the escrow account to be released
     */
    function release(uint _id) public {

        Lock memory lock = locks[_id];

        require(lock.endBlock != 0, "must have escrow period set");
        require(block.number >= lock.endBlock, "escrow period must have expired");

        escrow.release(_id, lock.releaseTo);

        delete locks[_id];

        emit Released(_id);
    }

    /**
     * @dev Escrow a consecutive range of assets
     *
     * @param _asset NFT contract address of the assets to be escrowed
     * @param _low The first token ID in the range to be escrowed (inclusive)
     * @param _high The last token ID in the range to be escrowed (inclusive)
     * @param _owner Address which will own these assets during escrow
     * @param _duration Number of blocks for which to hold this asset in escrow
     * @param _releaseTo Address to which these assets should be released post-escrow
     */
    function escrowRange(
        Asset _asset,
        uint _low,
        uint _high,
        address _owner,
        uint64 _duration,
        address _releaseTo
    ) public returns (uint) {

        // escrow the assets with this contract as the releaser
        uint id = escrow.escrowRange(_asset, _low, _high, _owner, address(this));

        _lock(id, _duration, _releaseTo);
    }

    /**
     * @dev Escrow a list of assets
     *
     * @param _asset NFT contract address of the assets to be escrowed
     * @param _ids Token IDs of the cards to be escrowed
     * @param _owner Address which will own these assets during escrow
     * @param _duration Number of blocks for which to hold this asset in escrow
     * @param _releaseTo Address to which these assets should be released post-escrow
     */
    function escrowList(
        Asset _asset,
        uint[] _ids,
        address _owner,
        uint64 _duration,
        address _releaseTo
    ) public returns (uint) {

        // escrow the assets with this contract as the releaser
        uint id = escrow.escrowRange(_asset, _low, _high, _owner, address(this));

        _lock(id, _duration, _releaseTo);
    }

    function _lock(
        uint _id,
        uint64 _duration,
        address _releaseTo
    ) internal {

        require(_duration > 0, "must be locked for a number of blocks");
        require(_releaseTo != address(0), "cannot release to the zero address");

        locks[_id] = Lock({
            endBlock: block.number + _duration
        });

        emit Locked(_id, _duration);
    }

}