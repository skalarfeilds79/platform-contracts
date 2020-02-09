pragma solidity ^0.5.11;

import "../Asset.sol";

/**
 * @title Immutable Escrow
 * @notice The contract recognised by the Immutable platform as storing assets in escrow.
 * @author Immutable
 */
contract Escrow {

    // Emitted when a range of tokens is escrowed
    event RangeEscrowed(
        uint indexed id,
        address indexed owner,
        address indexed asset,
        uint low,
        uint high,
        address releaser
    );

    // Emitted when a list of tokens is escrowed
    event ListEscrowed(
        uint indexed id,
        address indexed owner,
        address indexed asset,
        uint[] ids,
        address releaser
    );

    // Emitted when an account is released
    event Released(uint indexed id);

    struct Account {
        // the address which will own these assets during escrow
        address owner;
        // the address authorised to release these assets from escrow
        address releaser;
        // The contract address of the asset
        Asset asset;
        // The low end id of the range in escrow
        uint low;
        // The high end id of the range in escrow
        uint high;
        // the list of the token ids in escrow. If the length of this array is 0, a range has been escrowed
        uint[] ids;
    }

    // Count of how many escrow accounts have been created
    uint public counter;
    // Mapping from id to escrow accounts, used rather than an array to enable deleting released accounts
    mapping(uint => Account) accounts;

    /**
     * @dev Escrow a consecutive range of assets
     *
     * @param _asset NFT contract address of the assets to be escrowed
     * @param _low The first token ID in the range to be escrowed (inclusive)
     * @param _high The last token ID in the range to be escrowed (inclusive)
     * @param _owner Address which will own these assets during escrow
     * @param _releaser Address which can release these assets from escrow
     */
    function escrowRange(
        Asset _asset,
        uint _low,
        uint _high,
        address _owner,
        address _releaser
    ) external returns (uint) {

        require(address(_asset) != address(0), "asset address must not be null");
        require(_owner != address(0), "owner address must not be null");
        require(_releaser != address(0), "releaser address must not be null");
        require(_high > _low, "high must be higher than low");

        // TODO: update from address
        _asset.transferAllFrom(address(0), address(this), _buildList(_low, _high));

        uint id = counter++;

        accounts[id] = Account({
            owner: _owner,
            releaser: _releaser,
            asset: _asset,
            low: _low,
            high: _high,
            ids: new uint[](0)
        });

        emit RangeEscrowed(id, _owner, address(_asset), _low, _high, _releaser);

        return id;
    }

    /**
     * @dev Escrow a list of assets
     *
     * @param _asset NFT contract address of the assets to be escrowed
     * @param _ids IDs of the tokens to be escrowed
     * @param _owner Address which will own these assets during escrow
     * @param _releaser Address which can release these assets from escrow
     */
    function escrowList(
        Asset _asset,
        uint[] calldata _ids,
        address _owner,
        address _releaser
    ) external returns (uint) {

        require(address(_asset) != address(0), "asset address must not be null");
        require(_ids.length > 0, "must be at least one asset");
        require(_owner != address(0), "owner address must not be null");
        require(_releaser != address(0), "releaser address must not be null");

        // TODO: update from address
        _asset.transferAllFrom(address(0), address(this), _ids);

        uint id = counter++;

        accounts[id] = Account({
            owner: _owner,
            releaser: _releaser,
            asset: _asset,
            low: 0,
            high: 0,
            ids: _ids
        });

        emit ListEscrowed(id, _owner, address(_asset), _ids, _releaser);

        return id;
    }

    /**
     * @dev Release tokens from escrow. Can only be called by the account's releaser.
     *
     * @param _id ID of the escrow account
     * @param _to Address to which the tokens should be transferred
     */
    function release(
        uint _id,
        address _to
    ) external {

        Account memory a = accounts[_id];

        require(a.releaser == msg.sender, "must be the releaser");
        require(a.releaser != address(0), "must not have already been cleared");

        if (a.ids.length == 0) {
            a.asset.transferAllFrom(address(this), _to, _buildList(a.low, a.high));
        } else {
            a.asset.transferAllFrom(address(this), _to, a.ids);
        }

        delete accounts[_id];

        emit Released(_id);
    }

    function _buildList(
        uint low,
        uint high
    ) internal pure returns (uint[] memory) {
        uint length = high - low;
        uint[] memory ids = new uint[](length);
        // <= as the range is inclusive on both ends
        for (uint i = 0; i <= length; i++) {
            ids[i] = low + i;
        }
        return ids;
    }

}