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
    uint64 duration = 100;

    struct Purchase {
        uint256 count;
    }

    Purchase[] public purchases;

    constructor(ICreditCardEscrow _escrow, TestERC20Token _erc20, TestERC721Token _erc721) public {
        escrow = _escrow;
        erc20 = _erc20;
        erc721 = _erc721;
    }

    function purchaseERC20(address user, uint256 count) public {

        ERC20Escrow.Vault memory vault = ERC20Escrow.Vault({
            player: user,
            releaser: address(escrow),
            asset: erc20,
            balance: count
        });

        erc20.mint(user, count);

        escrow.escrowERC20(vault, duration, user);
    }

    function purchaseERC721(address user, uint256 count) public {

        // predict what the token IDs will be
        uint256 low = erc721.totalSupply();
        uint256 high = low + count;

        BatchERC721Escrow.Vault memory vault = BatchERC721Escrow.Vault({
            player: user,
            releaser: address(escrow),
            asset: erc721,
            lowTokenID: low,
            highTokenID: high
        });

        uint256 id = purchases.push(Purchase({
            count: count
        })) - 1;

        bytes memory data = abi.encodeWithSignature("escrowHook(uint256)", id);

        escrow.escrowBatch(vault, address(this), data, duration, user);
    }

    function escrowHook(uint256 purchaseID) public {
        require(msg.sender == address(escrow), "must be the escrow contract");
        Purchase memory p = purchases[purchaseID];
        erc721.mint(address(escrow), p.count);
        delete purchases[purchaseID];
    }

}