pragma solidity ^0.5.8;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Metadata.sol";

contract BlockToken is ERC721Metadata {

    using SafeMath for uint256;

    struct Block {
        uint48 userID;
        uint16 size;
    }

    mapping(uint48 => address) public userIDToAddress;
    mapping(address => uint48) public addressToUserID;

    uint public blockSize;
    uint public nextBlock;
    uint public tokenCount;

    uint48[] internal ownerIDs;
    uint48[] internal approvedIDs;

    Block[] public blocks;

    uint48 userCount = 1;
    uint public firstFree = 0;

    mapping (address => uint) internal _ownedTokensCount;

    uint256 internal constant MAX_LENGTH = uint(2**256 - 1);

    constructor(uint _blockSize, string memory name, string memory symbol) public ERC721Metadata(name, symbol) {
        blockSize = _blockSize;
        blocks.length = MAX_LENGTH;
        ownerIDs.length = MAX_LENGTH;
        approvedIDs.length = MAX_LENGTH;
    }

    function _sequentialMint(address to, uint16 size) internal returns (uint) {
        uint id = firstFree;
        uint end = id + size;
        uint48 uID = getUserID(to);
        for (uint i = id; i < end; i++) {
            emit Transfer(address(0), to, i);
            ownerIDs[i] = uID;
        }
        firstFree += size;
        _ownedTokensCount[to] += size;
        tokenCount += size;
        return id;
    }

    function getUserID(address to) internal returns (uint48) {
        uint48 uID = addressToUserID[to];
        if (uID == 0) {
            require(userCount + 1 > userCount, "must not overflow");
            uID = userCount++;
            userIDToAddress[uID] = to;
            addressToUserID[to] = uID;
        }
        return uID;
    }

    function getNextBlock() internal returns (uint) {
        if (firstFree > nextBlock) {
            nextBlock = _pageCount(firstFree, blockSize).mul(blockSize);
        }
        return nextBlock;
    }

    function _pageCount(uint items, uint perPage) internal pure returns (uint){
        return ((items - 1) / perPage) + 1;
    }

    function _blockMint(address to, uint16 size) internal returns (uint) {
        require(to != address(0), "must not be null");
        require(size > 0 && size <= blockSize, "size must be within limits");
        uint start = getNextBlock();
        uint48 uID = getUserID(to);
        blocks[start] = Block({
            userID: uID,
            size: size
        });
        uint end = start + size;
        for (uint i = start; i < end; i++) {
            emit Transfer(address(0), to, i);
        }
        nextBlock += blockSize;
        _ownedTokensCount[to] += size;
        tokenCount += size;
        return start;
    }

    function getBlockStart(uint tokenId) public view returns (uint) {
        return tokenId.div(blockSize).mul(blockSize);
    }

    function getBlock(uint index) public view returns (uint48 userID, uint16 size) {
        return (blocks[index].userID, blocks[index].size);
    }

    // Overridden ERC721 functions
    // @OZ: please stop making variables/functions private

    function ownerOf(uint256 tokenId) public view returns (address) {
        uint48 uID = ownerIDs[tokenId];
        if (uID == 0) {
            uint start = getBlockStart(tokenId);
            Block memory b = blocks[start];
            require(start + b.size > tokenId, "token does not exist");
            uID = b.userID;
        }
        return userIDToAddress[uID];
    }

    function transferFrom(address from, address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == from, "ERC721: transfer of token that is not own");
        require(to != address(0), "ERC721: transfer to the zero address");
        require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: caller is not owner nor approved");
        if (approvedIDs[tokenId] != 0) {
            approvedIDs[tokenId] = 0;
        }
        _ownedTokensCount[from]--;
        _ownedTokensCount[to]++;
        ownerIDs[tokenId] = getUserID(to);
        emit Transfer(from, to, tokenId);
    }

    function approve(address to, uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(msg.sender == owner || isApprovedForAll(owner, msg.sender),
            "ERC721: approve caller is not owner nor approved for all"
        );

        approvedIDs[tokenId] = getUserID(to);
        emit Approval(owner, to, tokenId);
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return ownerOf(tokenId) != address(0);
    }

    function getApproved(uint256 tokenId) public view returns (address) {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");
        return userIDToAddress[approvedIDs[tokenId]];
    }

    function totalSupply() public view returns (uint) {
        return tokenCount;
    }

    function balanceOf(address _owner) public view returns (uint256) {
        return _ownedTokensCount[_owner];
    }

}