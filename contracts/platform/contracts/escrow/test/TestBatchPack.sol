pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../BatchERC721Escrow.sol";
import "./TestERC721Token.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract TestBatchPack {

    struct Purchase {
        uint256 count;
    }

    Purchase[] public purchases;
    BatchERC721Escrow escrow;
    TestERC721Token asset;

    constructor(BatchERC721Escrow _escrow, TestERC721Token _asset) public {
        escrow = _escrow;
        asset = _asset;
    }

    function purchase(uint256 count) public {

        // predict what the token IDs will be
        uint256 low = asset.totalSupply();
        uint256 high = low + count;

        BatchERC721Escrow.Vault memory vault = BatchERC721Escrow.Vault({
            player: msg.sender,
            releaser: msg.sender,
            asset: asset,
            lowTokenID: low,
            highTokenID: high
        });

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

}