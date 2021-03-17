pragma solidity ^0.7.3;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./utils/Minting.sol";
import "./utils/String.sol";
import "hardhat/console.sol";

contract Card is ERC721, AccessControl {
    string private _baseURI = "https://api.immutable.com/asset/";

    event CardMinted(
        address to,
        uint256 amount,
        uint256 tokenId
    );

    constructor()
        public
        ERC721("Gods Unchained", "GU")
    {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);

        string memory uri = string(abi.encodePacked(
            _baseURI,
            String.fromAddress(address(this)),
            "/"
        ));

        super._setBaseURI(uri);
    }

    function mintFor(
        address to,
        uint256 amount,
        bytes memory mintingBlob
    ) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not an admin");

        uint256 tokenId = Minting.deserializeMintingBlob(mintingBlob);
        super._mint(to, tokenId);
        emit CardMinted(to, amount, tokenId);
    }

    function burn(uint256 tokenId) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not an admin");

        super._burn(tokenId);
    }
}
