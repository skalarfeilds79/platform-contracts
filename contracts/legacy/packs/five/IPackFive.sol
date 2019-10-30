pragma solidity ^0.5.11;

import "./Pack.sol";

/**
 * This file's sole purpose is because in v2 Migrations importing PackFive.sol to use the PackFive 
 * type causes a circular depedency via the import of ICards inside RarityProvider.sol.
 * We can probably get rid of this in the case v2 Migrations aren't needed.
 */

contract IPackFive {

    struct Purchase {
        uint count;
        uint randomness;
        uint[] state;
        Pack.Type packType;
        uint64 commit;
        uint64 lockup;
        bool revoked;
        address user;
    }

    Purchase[] public purchases;

    function getPurchaseState(uint purchaseID) public view returns (uint[] memory state);
    function predictPacks(uint id) external view returns (uint16[] memory protos, uint16[] memory purities);
    function canActivatePurchase(uint id) public view returns (bool);

}