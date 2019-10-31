pragma solidity 0.5.11;

import "../../Cards.sol";

contract PropertyAccessor {

    Cards public token;

    constructor(Cards _token) public {
        token = _token;
    }

    function getProperty(uint _id, bytes32 _key) public view returns (bytes32) {
        return token.getProperty(_id, _key);
    }

    function getClassProperty(bytes32 _key) public view returns (bytes32) {
        return token.getClassProperty(_key);
    }

    function getProtoTag() public view returns (bytes32) {
        bytes32 key = keccak256(abi.encodePacked("proto", uint(0), "tag"));
        return token.getClassProperty(key);
    }

}