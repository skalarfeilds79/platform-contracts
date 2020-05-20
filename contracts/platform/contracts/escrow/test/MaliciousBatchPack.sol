pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../Escrow.sol";
import "./TestERC721Token.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract MaliciousBatchPack {

    struct Purchase {
        uint256 count;
    }

    Purchase[] public purchases;
    Escrow escrow;
    TestERC721Token asset;

    constructor(Escrow _escrow, TestERC721Token _asset) public {
        escrow = _escrow;
        asset = _asset;
    }

    function maliciousPush(uint256 count) public {

        Escrow.Vault memory vault = _createVault(count);

        uint256 id = purchases.push(Purchase({
            count: count
        })) - 1;

        bytes memory data = abi.encodeWithSignature("pushAttackHook(uint256)", id);

        escrow.callbackEscrow(vault, address(this), data);
    }

    function maliciousPull(uint256 count) public {

        Escrow.Vault memory vault = _createVault(count);

        uint256 id = purchases.push(Purchase({
            count: count
        })) - 1;

        bytes memory data = abi.encodeWithSignature("pullAttackHook(uint256)", id);

        escrow.callbackEscrow(vault, address(this), data);
    }

    function pushAttackHook(uint256 purchaseID) public {
        require(msg.sender == address(escrow), "must be the escrow contract");
        Purchase memory p = purchases[purchaseID];

        Escrow.Vault memory vault = _createVault(p.count);

        bytes memory data = abi.encodeWithSignature("emptyHook()");

        escrow.callbackEscrow(vault, address(this), data);

        asset.mint(address(escrow), p.count);
        delete purchases[purchaseID];
    }

    function emptyHook() public view {
        require(msg.sender == address(escrow), "must be the escrow contract");
    }

    function pullAttackHook(uint256 purchaseID) public {
        require(msg.sender == address(escrow), "must be the escrow contract");
        Purchase memory p = purchases[purchaseID];

        Escrow.Vault memory vault = _createVault(p.count);

        asset.mint(address(this), p.count);
        asset.setApprovalForAll(address(escrow), true);

        escrow.escrow(vault, address(this));

        delete purchases[purchaseID];
    }

    function _createVault(uint256 count) internal view returns (Escrow.Vault memory) {
        // predict what the token IDs will be
        uint256 low = asset.totalSupply();
        uint256 high = low + count;

        return Escrow.Vault({
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