pragma solidity ^0.5.11;

contract ValidReceiver {

    // `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`
    bytes4 private constant ERC721_RECEIVED = 0x150b7a02;

    function onERC721Received(address _from, address _to, uint256 _tokenId, bytes calldata _data)
        external
        returns (bytes4)
    {
        return ERC721_RECEIVED;
    }
    
}