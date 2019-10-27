pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

// solium-disable security/no-inline-assembly

import "./token/MultiTransfer.sol";
import "./token/BatchToken.sol";
import "./token/ImmutableToken.sol";
import "./token/InscribableToken.sol";
import "./ICards.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./util/StorageWrite.sol";

contract Cards is Ownable, MultiTransfer, BatchToken, ImmutableToken, InscribableToken {

    uint16[] public cardProtos;
    uint8[] public cardQualities;

    struct Season {
        uint16 high;
        uint16 low;
    }

    struct Proto {
        bool exists;
        uint8 god;
        uint8 season;
        uint8 cardType;
        uint8 rarity;
        uint8 mana;
        uint8 attack;
        uint8 health;
        uint8 tribe;
    }

    event ProtoSet(uint16 indexed id, Proto proto);
    event SeasonStarted(uint indexed id, uint16 indexed low, uint16 indexed high);
    event QualityChanged(uint indexed tokenId, uint8 quality, address factory);

    address public propertyManager;
    Proto[] public protos;
    Season[] public seasons;
    mapping(uint => bool) public seasonTradable;
    mapping(address => mapping(uint => bool)) public factoryApproved;
    mapping(uint16 => bool) public mythicCreated;
    uint16 public constant mythicThreshold = 65000;

    constructor(uint _batchSize, string memory _name, string memory _symbol) public BatchToken(_batchSize, _name, _symbol) {
        cardProtos.length = MAX_LENGTH;
        cardQualities.length = MAX_LENGTH;
        protos.length = MAX_LENGTH;
        propertyManager = msg.sender;
    }

    function getDetails(uint tokenId) public view returns (uint16 proto, uint8 quality) {
        return (cardProtos[tokenId], cardQualities[tokenId]);
    }

    function mintCards(address to, uint16[] memory _protos, uint8[] memory _qualities) public returns (uint) {
        require(_protos.length > 0, "must be some protos");
        require(_protos.length == _qualities.length, "must be the same number of protos/qualities");
        uint start = _sequentialMint(to, uint16(_protos.length));
        _validateAndSaveDetails(start, _protos, _qualities);
    }

    function addFactory(address _factory, uint _season) public onlyOwner {
        require(!factoryApproved[_factory][_season], "this factory is already approved");
        require(!seasonTradable[_season], "season must not be tradable");
        factoryApproved[_factory][_season] = true;
    }

    function unlockTrading(uint _season) public onlyOwner {
        require(!seasonTradable[_season], "season must not be tradable");
        seasonTradable[_season] = true;
    }

    function transferFrom(address from, address to, uint256 tokenId) public {
        require(isTradable(tokenId), "not yet tradable");
        super.transferFrom(from, to, tokenId);
    }

    function burn(uint _tokenId) public {
        require(isTradable(_tokenId), "not yet tradable");
        super.burn(_tokenId);
    }

    function isTradable(uint _tokenId) public view returns (bool) {
        return seasonTradable[protos[cardProtos[_tokenId]].season];
    }

    function startSeason(uint16 low, uint16 high) public returns (uint) {

        require(high > low, "must be a valid range");
        require(seasons.length == 0 || low >= seasons[seasons.length - 1].high, "seasons cannot overlap");

        uint id = seasons.push(Season({ high: high, low: low })) - 1;

        emit SeasonStarted(id, low, high);

        return id;
    }

    function updateProtos(uint16[] memory _ids, Proto[] memory _protos) public onlyOwner {
        require(_ids.length == _protos.length, "ids/protos must be the same length");
        for (uint i = 0; i < _ids.length; i++) {
            protos[_ids[i]] = _protos[i];
            emit ProtoSet(_ids[i], _protos[i]);
        }
    }

    function _validateAndSaveDetails(uint start, uint16[] memory _protos, uint8[] memory _qualities) internal {
        _validateProtos(_protos);

        uint cp; assembly { cp := cardProtos_slot }
        StorageWrite.uint16s(cp, start, _protos);
        uint cq; assembly { cq := cardQualities_slot }
        StorageWrite.uint8s(cq, start, _qualities);

    }

    function batchMintCards(address to, uint16[] memory _protos, uint8[] memory _qualities) public returns (uint) {
        require(_protos.length > 0, "must be some protos");
        require(_protos.length == _qualities.length, "must be the same number of protos/qualities");
        uint start = _batchMint(to, uint16(_protos.length));
        _validateAndSaveDetails(start, _protos, _qualities);
        return start;
    }

    uint16 private constant MAX_UINT16 = 2**16 - 1;

    function _validateProtos(uint16[] memory _protos) internal {
        // mythics can only be created during the current season
        uint16 maxProto = 0;
        uint16 minProto = MAX_UINT16;
        for (uint i = 0; i < _protos.length; i++) {
            uint16 proto = _protos[i];
            if (proto >= mythicThreshold) {
                require(!mythicCreated[proto], "mythic has already been created");
                mythicCreated[proto] = true;
            } else {
                if (proto > maxProto) {
                    maxProto = proto;
                }
                if (minProto > proto) {
                    minProto = proto;
                }
            }
        }
        uint season = protos[maxProto].season;
        // cards must be from the same season
        require(season == protos[minProto].season, "can only create cards from the same season");
        require(factoryApproved[msg.sender][season], "must be approved factory for this season");

        Season memory s = seasons[season];

        require(maxProto == 0 || maxProto <= s.high, "max failure: this factory cannot create this card");
        require(minProto == MAX_UINT16 || minProto >= s.low, "min failure: this factory cannot create this card");
    }

    function setQuality(uint _tokenId, uint8 _quality) public {
        uint16 proto = cardProtos[_tokenId];
        uint season = protos[proto].season;
        require(factoryApproved[msg.sender][season], "factory can't change quality of this season");
        cardQualities[_quality] = _quality;
        emit QualityChanged(_tokenId, _quality, msg.sender);
    }

    function setPropertyManager(address _manager) public onlyOwner {
        propertyManager = _manager;
    }

    function setProperty(uint _id, bytes32 _key, bytes32 _value) public {
        require(msg.sender == propertyManager, "must be property manager");
        _setProperty(_id, _key, _value);
    }

    function setClassProperty(bytes32 _key, bytes32 _value) public {
        require(msg.sender == propertyManager, "must be property manager");
        _setClassProperty(_key, _value);
    }

}

