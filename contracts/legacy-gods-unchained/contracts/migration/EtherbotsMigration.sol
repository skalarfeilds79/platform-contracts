pragma solidity 0.5.11;

import "@imtbl/gods-unchained/contracts/Cards.sol";

import "../cards/CardIntegrationTwo.sol";
import "../cards/CardBase.sol";

import "./BaseMigration.sol";

contract EtherbotsMigration is BaseMigration {

    // The old cards contract
    CardIntegrationTwo public oldCards;

    // The new cards contract to migrate to
    Cards public newCards;

    // Keep track of migrated cards
    mapping (uint => bool) public hasMigrated;

    constructor(address _oldCardsAddress, address _newCardsAddress) public {
        oldCards = CardIntegrationTwo(_oldCardsAddress);
        newCards = Cards(_newCardsAddress);
    }

    event Migrated(
        uint tokenId,
        address owner,
        uint16 proto,
        uint8 quality
    );

    /**
     * @dev Migrate Etherbot cards from the old Cards contract to the new one.
     *
     * @param _tokenId The id of the Etherbots card
     */
    function migrate(
        uint _tokenId
    ) public {
        require(
            oldCards.ownerOf(_tokenId) == msg.sender,
            "Etherbots Migration: must be the owner of the Etherbot"
        );

        require(
            hasMigrated[_tokenId] == false,
            "Etherbots Migration: has already migrated Etherbot"
        );

        (uint16 proto, uint16 purity) = oldCards.getCard(_tokenId);

        uint16 convertedProto = convertProto(proto);
        uint8 convertedQuality = convertPurity(purity);

        hasMigrated[_tokenId] = true;

        newCards.mintCard(msg.sender, convertedProto, convertedQuality);

        emit Migrated(_tokenId, msg.sender, convertedProto, convertedQuality);
    }
}