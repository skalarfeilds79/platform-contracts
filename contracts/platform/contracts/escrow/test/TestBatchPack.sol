pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../Escrow.sol";
import "./TestERC721Token.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract TestBatchPack {

    struct Purchase {
        uint256 count;
    }

    Purchase[] public purchases;
    Escrow escrow;
    TestERC721Token asset;
    uint purchaseID;

    constructor(Escrow _escrow, TestERC721Token _asset) public {
        escrow = _escrow;
        asset = _asset;
    }

    function purchase(uint256 count) external {

        // predict what the token IDs will be
        uint256 low = asset.totalSupply();
        uint256 high = low + count;

        Escrow.Vault memory vault = Escrow.Vault({
            player: msg.sender,
            admin: msg.sender,
            asset: address(asset),
            balance: 0,
            lowTokenID: low,
            highTokenID: high,
            tokenIDs: new uint256[](0)
        });

        purchaseID = purchases.push(Purchase({
            count: count
        })) - 1;
        escrow.escrow(vault);
    }

    function onEscrowCallback() external returns (bytes4) {
        require(msg.sender == address(escrow), "must be the escrow contract");
        uint256 count = purchases[purchaseID].count;
        delete purchases[purchaseID];
        asset.mint(address(escrow), count);
        return bytes4(keccak256("Immutable Escrow Callback"));
    }

}