pragma solidity 0.5.11;

import "../legacy/packs/four/IPackFour.sol";
import "./V1Migration.sol";

contract CanBeV1Migrated {

    v1Migration public migration;

    constructor(v1Migration _migration) public {
        migration = _migration;
    }

    function canBeMigrated(IPackFour _factory, uint _id) public returns (bool) {
        (bool success,) = address(migration).call(abi.encodeWithSignature("migrate(address,uint)", _factory, _id));
        return success;
    }

}