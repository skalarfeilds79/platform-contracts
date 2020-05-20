pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../IEscrow.sol";
import "./TestERC721Token.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract MaliciousBatchPack {

    struct Purchase {
        uint256 count;
    }

    Purchase[] public purchases;
    IEscrow escrow;
    TestERC721Token asset;

    constructor(IEscrow _escrow, TestERC721Token _asset) public {
        escrow = _escrow;
        asset = _asset;
    }

    function maliciousPush(uint256 count) external {

        IEscrow.Vault memory vault = _createVault(count);

        uint256 id = purchases.push(Purchase({
            count: count
        })) - 1;

        bytes memory data = abi.encodeWithSignature("pushAttackHook(uint256)", id);

        escrow.callbackEscrow(vault, address(this), data);
    }

    function maliciousPull(uint256 count) external {

        IEscrow.Vault memory vault = _createVault(count);

        uint256 id = purchases.push(Purchase({
            count: count
        })) - 1;

        bytes memory data = abi.encodeWithSignature("pullAttackHook(uint256)", id);

        escrow.callbackEscrow(vault, address(this), data);
    }

    function pushAttackHook(uint256 purchaseID) external {
        require(msg.sender == address(escrow), "must be the escrow contract");
        uint256 count = purchases[purchaseID].count;
        delete purchases[purchaseID];
        IEscrow.Vault memory vault = _createVault(count);

        bytes memory data = abi.encodeWithSignature("emptyHook()");

        escrow.callbackEscrow(vault, address(this), data);

        asset.mint(address(escrow), count);
    }

    function emptyHook() external view {
        require(msg.sender == address(escrow), "must be the escrow contract");
    }

    function pullAttackHook(uint256 purchaseID) external {
        require(msg.sender == address(escrow), "must be the escrow contract");
        uint256 count = purchases[purchaseID].count;
        delete purchases[purchaseID];
        IEscrow.Vault memory vault = _createVault(count);

        asset.mint(address(this), count);
        asset.setApprovalForAll(address(escrow), true);
        escrow.escrow(vault, address(this));
    }

    function _createVault(uint256 count) internal view returns (IEscrow.Vault memory) {
        // predict what the token IDs will be
        uint256 low = asset.totalSupply();
        uint256 high = low + count;

        return IEscrow.Vault({
            player: msg.sender,
            admin: msg.sender,
            asset: address(asset),
            balance: 0,
            lowTokenID: low,
            highTokenID: high,
            tokenIDs: new uint256[](0)
        });
    }

}