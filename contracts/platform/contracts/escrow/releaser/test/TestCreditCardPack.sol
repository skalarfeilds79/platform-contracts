pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../ICreditCardEscrow.sol";
import "../../ERC20Escrow.sol";
import "../../test/TestERC20Token.sol";
import "../../test/TestERC721Token.sol";

contract TestCreditCardPack {

    ICreditCardEscrow escrow;
    TestERC20Token erc20;
    TestERC721Token erc721;

    struct Purchase {
        uint256 count;
    }

    Purchase[] public purchases;

    constructor(ICreditCardEscrow _escrow, TestERC20Token _erc20, TestERC721Token _erc721) public {
        escrow = _escrow;
        erc20 = _erc20;
        erc721 = _erc721;
    }

    function purchaseERC20(address user, uint256 count, uint64 duration) public {

        IERC20Escrow.Vault memory vault = IERC20Escrow.Vault({
            player: user,
            releaser: address(escrow),
            asset: erc20,
            balance: count
        });

        uint256 id = purchases.push(Purchase({
            count: count
        })) - 1;

        bytes memory data = abi.encodeWithSignature("erc20Hook(uint256)", id);

        escrow.escrowERC20(vault, address(this), data, duration);
    }

    function purchaseERC721(address user, uint256 count, uint64 duration) public {

        // predict what the token IDs will be
        uint256 low = erc721.totalSupply();
        uint256 high = low + count;

        IBatchERC721Escrow.Vault memory vault = IBatchERC721Escrow.Vault({
            player: user,
            releaser: address(escrow),
            asset: erc721,
            lowTokenID: low,
            highTokenID: high
        });

        uint256 id = purchases.push(Purchase({
            count: count
        })) - 1;

        bytes memory data = abi.encodeWithSignature("erc721Hook(uint256)", id);

        escrow.escrowBatch(vault, address(this), data, duration);
    }

    function erc721Hook(uint256 purchaseID) public {
        address erc721Escrow = address(escrow.getBatchEscrow());
        require(msg.sender == erc721Escrow, "must be the escrow contract");
        Purchase memory p = purchases[purchaseID];
        erc721.mint(erc721Escrow, p.count);
        delete purchases[purchaseID];
    }

    function erc20Hook(uint256 purchaseID) public {
        address erc20Escrow = address(escrow.getERC20Escrow());
        require(msg.sender == erc20Escrow, "must be the escrow contract");
        Purchase memory p = purchases[purchaseID];
        erc20.mint(erc20Escrow, p.count);
        delete purchases[purchaseID];
    }

}