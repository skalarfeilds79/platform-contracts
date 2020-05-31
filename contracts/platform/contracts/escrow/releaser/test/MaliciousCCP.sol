pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../CreditCardEscrow.sol";
import "../../test/TestERC20Token.sol";
import "../../test/TestERC721Token.sol";

contract MaliciousCCP {

    Escrow escrow;
    TestERC20Token erc20;
    TestERC721Token erc721;

    constructor(Escrow _escrow, TestERC20Token _erc20, TestERC721Token _erc721) public {
        escrow = _escrow;
        erc20 = _erc20;
        erc721 = _erc721;
    }

    function stealERC20(address user, uint256 count) external {

        Escrow.Vault memory vault = Escrow.Vault({
            player: user,
            admin: user,
            asset: address(erc20),
            balance: count,
            lowTokenID: 0,
            highTokenID: 0,
            tokenIDs: new uint256[](0)
        });

        bytes memory data = abi.encodeWithSignature("erc20FakeHook()");

        escrow.callbackEscrow(vault, data);
    }

    function stealERC721(address user, uint256 low, uint256 high) external {

        Escrow.Vault memory vault = Escrow.Vault({
            player: user,
            admin: user,
            asset: address(erc721),
            balance: 0,
            lowTokenID: low,
            highTokenID: high,
            tokenIDs: new uint256[](0)
        });

        bytes memory data = abi.encodeWithSignature("erc721FakeHook()");

        escrow.callbackEscrow(vault, data);
    }

    function erc721FakeHook() external {
    }

    function erc20FakeHook() external {
    }

}