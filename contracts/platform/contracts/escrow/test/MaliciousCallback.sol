pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../Escrow.sol";
import "./TestERC20Token.sol";
import "./TestERC721Token.sol";

contract MaliciousCallback {

    TestERC20Token erc20;
    TestERC721Token erc721;
    Escrow escrow;

    constructor(Escrow _escrow, TestERC20Token _erc20, TestERC721Token _erc721) public {
        escrow = _escrow;
        erc20 = _erc20;
        erc721 = _erc721;
    }

    function erc20Transfer() public {
        erc20.mint(address(escrow), 100);
        Escrow.Vault memory vault = _standardVault();
        bytes memory data = abi.encodeWithSignature("transfer(address,uint256)", address(this), 100);
        escrow.callbackEscrow(vault, address(erc20), data);
    }

    function erc20TransferFrom() public {
        erc20.mint(address(escrow), 100);
        Escrow.Vault memory vault = _standardVault();
        bytes memory data = abi.encodeWithSignature("transferFrom(address,address,uint256)", address(escrow), address(this), 100);
        escrow.callbackEscrow(vault, address(erc20), data);
    }

    function erc20Approve() public {
        erc20.mint(address(escrow), 100);
        Escrow.Vault memory vault = _standardVault();
        bytes memory data = abi.encodeWithSignature("approve(address,uint256)", address(this), 100);
        escrow.callbackEscrow(vault, address(erc20), data);
        erc20.transferFrom(address(escrow), address(erc20), 100);
    }

    function erc721TransferFrom() public {
        erc721.mint(address(escrow), 1);
        Escrow.Vault memory vault = _standardVault();
        bytes memory data = abi.encodeWithSignature(
            "transferFrom(address,address,uint256)",
            address(escrow), address(this), 0
        );
        escrow.callbackEscrow(vault, address(erc721), data);
    }

    function erc721SafeTransferFrom1() public {
        erc721.mint(address(escrow), 1);
        Escrow.Vault memory vault = _standardVault();
        bytes memory data = abi.encodeWithSignature(
            "safeTransferFrom(address,address,uint256,bytes)",
            address(escrow), address(this), 0
        );
        escrow.callbackEscrow(vault, address(erc721), data);
    }

    function erc721SafeTransferFrom2() public {
        erc721.mint(address(escrow), 1);
        Escrow.Vault memory vault = _standardVault();
        bytes memory data = abi.encodeWithSignature(
            "safeTransferFrom(address,address,uint256)",
            address(escrow), address(this), 0
        );
        escrow.callbackEscrow(vault, address(erc721), data);
    }

    function erc721SetApprovalForAll() public {
        erc721.mint(address(escrow), 1);
        Escrow.Vault memory vault = _standardVault();
        bytes memory data = abi.encodeWithSignature(
            "setApprovalForAll(address,bool)",
            address(this), true
        );
        escrow.callbackEscrow(vault, address(erc721), data);
        erc721.transferFrom(address(escrow), address(this), 0);
    }

    function erc721Approve() public {
        erc721.mint(address(escrow), 1);
        Escrow.Vault memory vault = _standardVault();
        bytes memory data = abi.encodeWithSignature(
            "approve(address,bool)",
            address(this), true
        );
        escrow.callbackEscrow(vault, address(erc721), data);
        erc721.transferFrom(address(escrow), address(this), 0);
    }

    // function listSafeTransfer() public {

    // }

    // function listTransfer() public {
        
    // }

    // function batchSafeTransfer() public {

    // }

    // function batchTransfer() public {

    // }

    function _standardVault() internal returns (Escrow.Vault memory) {
        // ensure we have the balance
        erc20.mint(address(this), 1);
        return Escrow.Vault({
            player: msg.sender,
            admin: msg.sender,
            asset: address(erc20),
            balance: 1,
            lowTokenID: 0,
            highTokenID: 0,
            tokenIDs: new uint256[](0)
        });
    }

}