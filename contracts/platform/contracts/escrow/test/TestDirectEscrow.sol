pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../Escrow.sol";
import "./TestERC721Token.sol";
import "./TestERC20Token.sol";

contract TestDirectEscrow {

    struct MintingInstructions {
        uint256 erc20s;
        uint256 erc721s;
    }

    Escrow public protocol;
    TestERC20Token public erc20;
    TestERC721Token public erc721;
    bool callbackMade;
    MintingInstructions instructions;

    constructor(Escrow _protocol, TestERC20Token _erc20, TestERC721Token _erc721) public {
        protocol = _protocol;
        erc20 = _erc20;
        erc721 = _erc721;
    }

    function escrow(Escrow.Vault memory _vault, MintingInstructions memory _instructions) public {
        instructions = _instructions;
        protocol.escrow(_vault);
        callbackMade = false;
    }

    function onEscrowCallback() external returns (bytes4) {
        require(msg.sender == address(protocol), "must be the escrow contract");
        require(!callbackMade, "callback must not have been made");
        if (instructions.erc20s > 0) {
            erc20.mint(address(protocol), instructions.erc20s);
        }
        if (instructions.erc721s > 0) {
            erc721.mint(address(protocol), instructions.erc721s);
        }
        callbackMade = true;
        return bytes4(keccak256("Immutable Escrow Callback"));
    }
}