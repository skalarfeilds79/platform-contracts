pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../ListERC721Escrow.sol";
import "./TestERC721Token.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract TestListPack {

    struct Purchase {
        uint256 count;
    }

    Purchase[] public purchases;
    ListERC721Escrow escrow;
    TestERC721Token asset;

    constructor(ListERC721Escrow _escrow, TestERC721Token _asset) public {
        escrow = _escrow;
        asset = _asset;
    }

    function purchase(uint256 count) public {

        ListERC721Escrow.Vault memory vault = _createVault(count);

        uint256 id = purchases.push(Purchase({
            count: count
        })) - 1;

        bytes memory data = abi.encodeWithSignature("escrowHook(uint256)", id);

        escrow.callbackEscrow(vault, address(this), data);
    }

    function escrowHook(uint256 purchaseID) public {
        require(msg.sender == address(escrow), "must be the escrow contract");
        Purchase memory p = purchases[purchaseID];
        asset.mint(address(escrow), p.count);
        delete purchases[purchaseID];
    }

    function _createVault(uint256 count) internal returns (ListERC721Escrow.Vault memory) {

        // predict token IDs
        uint[] memory ids = new uint[](count);
        uint start = asset.totalSupply();
        for (uint i = 0; i < count; i++) {
            ids[i] = start + i;
        }

        return ListERC721Escrow.Vault({
            player: msg.sender,
            releaser: msg.sender,
            asset: asset,
            tokenIDs: ids
        });
    }

}