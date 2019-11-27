pragma solidity ^0.5.8;

import "../Wallet.sol";
import "./OnlyOwnerModule.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract TransferModule is Ownable, OnlyOwnerModule {

    // `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`
    bytes4 private constant ERC721_RECEIVED = 0x150b7a02;

    mapping(address => bool) public old;

    event NFTTransfer(
        address indexed wallet,
        address to,
        address indexed token,
        uint256 indexed id,
        bytes data
    );

    event TokenTransfer(
        address indexed wallet,
        address _to,
        address indexed token,
        uint _value,
        bytes data
    );

    event ETHTransfer(
        address indexed wallet,
        address _to,
        uint amount
    );

    event OldContract(
        address indexed _contract,
        bool _value
    );


    function onEnabled(Wallet _wallet) public {
        _wallet.register(ERC721_RECEIVED, address(this));
    }

    function setOld(address _contract, bool _value) public onlyOwner {
        old[_contract] = _value;
    }

    function transferETH(
        Wallet _wallet,
        address _to,
        uint _amount
    )
        public
        onlyWalletOwner(_wallet)
    {
        _wallet.executeValue(_to, "", _amount);

        emit ETHTransfer(
            address(_wallet),
            _to,
            _amount
        );
    }

    function transferERC20(
        Wallet _wallet,
        address _to,
        address _token,
        uint _value,
        bytes memory _data
    )
        public
        onlyWalletOwner(_wallet)
    {
        bytes memory methodData = abi.encodeWithSignature(
            "transfer(address,uint256)",
            _to, _value
        );
        _wallet.execute(_token, methodData);
        emit TokenTransfer(
            address(_wallet),
            _to,
            _token,
            _value,
            _data
        );
    }

    function transferERC721(
        Wallet _wallet,
        address _to,
        address _contract,
        uint _tokenID,
        bool _safe,
        bytes memory _data
    )
        public
        onlyWalletOwner(_wallet)
    {
        bytes memory methodData;
        if (old[_contract]) {
            methodData = abi.encodeWithSignature("transfer(address,uint256)", _contract, _to);
        } else {
            if (_safe) {
                methodData = abi.encodeWithSignature(
                    "safeTransferFrom(address,address,uint256,bytes)",
                    address(_wallet), _to, _tokenID, _data
                );
            } else {
                methodData = abi.encodeWithSignature(
                    "transferFrom(address,address,uint256)",
                    address(_wallet), _to, _tokenID
                );
            }
        }
        _wallet.execute(_contract, methodData);
        emit NFTTransfer(address(_wallet), _to, _contract, _tokenID, _data);
    }

    function approveERC20(
        Wallet _wallet,
        address _token,
        address _spender,
        uint _amount
    )
        public
    {
        bytes memory data = abi.encodeWithSignature("approve(address,uint256)", _spender, _amount);
        _wallet.execute(_token, data);
    }

    function approveERC721(
        Wallet _wallet,
        address _contract,
        address _to,
        uint256 _tokenId
    )
        public
    {
        bytes memory data = abi.encodeWithSignature("approve(address,uint256)", _to, _tokenId);
        _wallet.execute(_contract, data);
    }

    function setApprovalForAllERC721(
        Wallet _wallet,
        address _token,
        address _operator,
        bool _approved
    )
        public
    {
        bytes memory data = abi.encodeWithSignature("setApprovalForAll(address,bool)", _operator, _approved);
        _wallet.execute(_token, data);
    }

    function onERC721Received(
        address _from,
        address _to,
        uint256 _tokenId,
        bytes calldata _data
    )
        external
        returns (bytes4)
    {
        return ERC721_RECEIVED;
    }


}