pragma solidity 0.5.11;

// solium-disable security/no-inline-assembly

import "./token/MultiTransfer.sol";
import "./token/BlockToken.sol";
import "./token/ImmutableToken.sol";
import "./ICards.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./util/StorageWrite.sol";

contract Cards is Ownable, MultiTransfer, BlockToken, ImmutableToken {

    uint16[] public cardProtos;
    uint8[] public cardQualities;

    struct Season {
        uint16 high;
        uint16 low;
    }

    uint16[] public protoToSeason;
    mapping(address => bool) public approvedPacks;
    mapping(uint => bool) public seasonTradable;
    mapping(address => uint) public packToSeason;
    mapping(uint16 => bool) public mythicCreated;
    Season[] public seasons;
    uint16 public constant mythicThreshold = 65000;

    constructor(uint _blockSize, string memory _name, string memory _symbol) public BlockToken(_blockSize, _name, _symbol) {
        cardProtos.length = MAX_LENGTH;
        cardQualities.length = MAX_LENGTH;
        protoToSeason.length = MAX_LENGTH;
    }

    function mintCards(address to, uint16[] memory _protos, uint8[] memory _qualities) public {
        require(_protos.length > 0, "");
        require(_protos.length == _qualities.length, "");
        uint start = _sequentialMint(to, uint16(_protos.length));
        _validateAndSaveDetails(start, _protos, _qualities);
    }

    function addPack(address _pack, uint _season) public onlyOwner {
        require(packToSeason[_pack] == 0, "this pack is already used in another season");
        require(!seasonTradable[_season], "season must not be tradable");
        packToSeason[_pack] = _season;
    }

    function unlockTrading(uint _season) public onlyOwner {
        require(!seasonTradable[_season], "season must not be tradable");
        seasonTradable[_season] = true;
    }

    function transferFrom(address from, address to, uint256 tokenId) public {
        require(seasonTradable[protoToSeason[cardProtos[tokenId]]], "not yet tradable");
        super.transferFrom(from, to, tokenId);
    }

    function startSeason(uint16 low, uint16 high) public returns (uint) {

        require(high > low, "");
        require(seasons.length == 0 || low >= seasons[currentSeason()].high, "seasons cannot overlap");

        uint id = seasons.push(Season({ high: high, low: low })) - 1;

        uint ps; assembly { ps := protoToSeason_slot }
        StorageWrite.repeatUint16(ps, low, high - low, uint16(id));

        return id;
    }

    function currentSeason() public view returns (uint) {
        return seasons.length - 1;
    }

    function _validateAndSaveDetails(uint start, uint16[] memory _protos, uint8[] memory _qualities) internal {
        _validateProtos(_protos);

        uint cp; assembly { cp := cardProtos_slot }
        StorageWrite.uint16s(cp, start, _protos);
        uint cq; assembly { cq := cardQualities_slot }
        StorageWrite.uint8s(cq, start, _qualities);
    }

    function blockMintCards(address to, uint16[] memory _protos, uint8[] memory _qualities) public {
        require(_protos.length > 0, "");
        require(_protos.length == _qualities.length, "");
        uint start = _blockMint(to, uint16(_protos.length));
        _validateAndSaveDetails(start, _protos, _qualities);
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

        Season memory s = seasons[packToSeason[msg.sender]];
        require(maxProto == 0 || maxProto <= s.high, "max failure: this pack cannot create this card");
        require(minProto == MAX_UINT16 || minProto >= s.low, "min failure: this pack cannot create this card");
    }

    function setQuality(uint _tokenId, uint8 _quality) public {
        uint16 proto = cardProtos[_tokenId];
        require(packToSeason[msg.sender] == protoToSeason[proto], "pack");
        cardQualities[_quality] = _quality;
    }

}

