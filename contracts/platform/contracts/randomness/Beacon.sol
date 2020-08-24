pragma solidity 0.5.11;

import "@openzeppelin/contracts/math/SafeMath.sol";

/**
 * @title Immutable Randomness Beacon
 * @notice A commit/reveal based randomness beacon. Use for low-security randomness.
 * @author Immutable
 */
contract Beacon {

    using SafeMath for uint256;

    // Emitted after a commitment is made
    event Commit(uint256 indexed commitBlock);
    // Emitted after a block is 'recommitted'
    event Recommit(uint256 indexed original, uint256 indexed forwardTo);
    // Emitted once a successful callback is made
    event Callback(uint256 indexed commitBlock, bytes32 seed);

    // Maps an old commit block to a newer commit block if a recommit is necessary
    mapping(uint256 => uint256) public forwards;
    // Saved block hashes are our source of randomness
    mapping(uint256 => bytes32) public blockHashes;
    // Tracks whether a commit has been requested for a specific block number
    mapping(uint256 => bool) public commitRequested;

    /**
     * @dev Request randomness derived from a particular block
     *
     * @param _offset the offset from the current block of the block which will be used in our random seed
     */
    function commit(uint256 _offset) external returns (uint256) {
        return _commit(_offset);
    }

    function _commit(uint256 _offset) internal returns (uint256) {
        uint256 commitBlock = block.number.add(_offset);
        if (!commitRequested[commitBlock]) {
            commitRequested[commitBlock] = true;
            emit Commit(commitBlock);
        }
        return commitBlock;
    }

    function _callback(uint256 _commitBlock) internal {

        require(commitRequested[_commitBlock], "IM:Beacon: must have requested a callback on this block");
        require(block.number > _commitBlock, "IM:Beacon: cannot callback on the same block");

        if (blockHashes[_commitBlock] == bytes32(0)) {
            bytes32 bhash = blockhash(_commitBlock);
            require(bhash != bytes32(0), "IM:Beacon: blockhash must not be zero");

            blockHashes[_commitBlock] = bhash;
            emit Callback(_commitBlock, bhash);
        }
    }

    /**
     * @dev Callback on a block. Will succeed even if no callback is necessary. Returns the randomness.
     *
     * @param _commitBlock the block in question
     */
    function callback(uint256 _commitBlock) external returns (bytes32) {
        uint256 currentBlock = getCurrentBlock(_commitBlock);
        if (blockHashes[currentBlock] == bytes32(0)) {
            _callback(currentBlock);
        }
        return blockHashes[currentBlock];
    }

    /**s
     * @dev Get the randomness result for a particular block
     *
     * @param _commitBlock the block in question
     */
    function randomness(uint256 _commitBlock) external view returns (bytes32) {
        uint256 currentBlock = getCurrentBlock(_commitBlock);
        require(blockHashes[currentBlock] != bytes32(0), "IM:Beacon: must have already callback");
        return blockHashes[currentBlock];
    }

    /**
     * @dev Forward all requests for this block's randomness to another block
     * as this block's hash is no longer discoverable
     *
     * @param _commitBlock the original commit block
     * @param _offset the offset from current block of the block which will be used in our random seed
     */
    function recommit(uint256 _commitBlock, uint256 _offset) external {

        require(commitRequested[_commitBlock], "IM:Beacon: original block must have requested a commit");

        uint256 currentBlock = getCurrentBlock(_commitBlock);

        require(block.number > currentBlock.add(256), "IM:Beacon: blockhash period must have expired");
        require(blockHashes[currentBlock] == bytes32(0), "IM:Beacon: randomness must not have been set");
        uint256 finalBlock = block.number.add(_offset);

        forwards[_commitBlock] = finalBlock;
        // actually commit to this new block
        _commit(_offset);

        emit Recommit(_commitBlock, finalBlock);
    }

    /**
     * @dev Gets the block which is the latest 'head' of this commit chain
     *
     * @param _commitBlock the original commit block
     */
    function getCurrentBlock(uint256 _commitBlock) public view returns (uint256) {
        uint256 forwardTo = forwards[_commitBlock];
        if (forwardTo == 0) {
            return _commitBlock;
        }
        uint256 lastForward = forwardTo;
        while (forwardTo != 0) {
            lastForward = forwardTo;
            forwardTo = forwards[forwardTo];
        }
        return lastForward;
    }

}