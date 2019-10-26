pragma solidity ^0.5.11;

import "../ICards.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract ActivatedMigration {

    // uint threshold;
    // IERC721 old;
    // ICards newToken;
    // uint blockSize;

    // event Migrated(uint start, uint end);
    // event V1Migrated();
    // event V2Migrated();

    // constructor(IERC721 _old, ICards _newToken, uint _threshold) public {
    //     old = _old;
    //     newToken = _newToken;
    //     threshold = _threshold;
    //     blockSize = _newToken.blockSize();
    // }

    // uint public migrated;

    // function activatedMigration() public returns (uint current) {
    //     address start = migrated;
    //     address first = oldToken.ownerOf(start);
    //     uint current = start;
    //     address owner = first;

    //     while (owner == first && current < blockSize) {
    //         // TODO: checkkkkkk
    //         owner = oldToken.ownerOf(current++);
    //     }

    //     uint size = current - migrated;

    //     uint16[] memory protos = new uint16[](size);
    //     uint16[] memory purities = new uint16[](size);
    //     uint16 proto;
    //     uint16 purity;

    //     for (uint i = 0; i < size; i++) {
    //         (proto, purity) = old.getDetails(start+i);
    //         protos[i] = proto;
    //         purities[i] = purities;
    //     }
        
    //     if (size <= threshold) {
    //         migrated = newToken.mintCards(owner, size);
    //     } else {
    //         migrated = newToken.batchMintCards(owner, size);
    //     }
    //     emit Migrated(start, current);
    // }

    // mapping (address => mapping (uint => bool)) v1Migrated;

    // function v1Migration(PackFour pack, uint id) public returns (uint start, uint end) {
    //     require(!v1Migrated[address(pack)][id], "purchase already migrated");
    //     PackFour.Purchase memory purchase = pack.purchases(id);
    //     uint size = (purchase.count - purchase.remaining) * 5;
    //     if (size != 0) {
    //         if (size <= threshold) {
    //             newStart = newToken.mint(owner, size);
    //         } else if (size > blockSize) {
    //             uint progress = 0;
    //             for (uint progress = 0; progress < size; progress += blockSize) {
    //                 if (progress + size >= blockSize) {
    //                     newToken.claimBlock(owner, blockSize);
    //                 } else {
    //                     newToken.claimBlock(owner, size - progress);
    //                 }
    //             }
    //         } else {
    //             newStart = newToken.claimBlock(owner, size);
    //         }
    //     }
    //     v1Migrated[address(pack)][id] = true;
    //     emit V1Migrated()
    // }

    // mapping (address => mapping (uint => bool)) v2Migrated;

    // function v2Migration(PackFive pack, uint id) public returns (uint start, uint end) {
    //     PackFive.Purchase memory purchase = pack.purchases(id);
    //     require(!pack.areAnyActivated(id), "must have no cards activated");
    //     require(v2Migrated[address(pack)][id], "must not have been migrated previously");
    //     uint size = purchase.count * 5;
    //     if (size != 0) {
    //         if (size <= threshold) {
    //             newStart = newToken.mint(owner, size);
    //         } else if (size > blockSize) {
    //             uint progress = 0;
    //             for (uint progress = 0; progress < size; progress += blockSize) {
    //                 if (progress + size >= blockSize) {
    //                     newToken.claimBlock(owner, blockSize);
    //                 } else {
    //                     newToken.claimBlock(owner, size - progress);
    //                 }
    //             }
    //         } else {
    //             newStart = newToken.claimBlock(owner, size);
    //         }
    //     }
    //     v2Migrated[address(pack)][id] = true;
    //     emit 
    // }



}