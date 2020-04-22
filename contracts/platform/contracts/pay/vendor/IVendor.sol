pragma solidity 0.5.11;

contract IVendor {

    event PaymentERC721RangeMinted(
        uint256 indexed paymentID,
        address indexed asset,
        uint256 lowTokenID,
        uint256 highTokenID
    );

    event PaymentERC721ListMinted(
        uint256 indexed paymentID,
        address indexed asset,
        uint256[] tokenIDs
    );

    event PaymentERC20Minted(
        uint256 indexed paymentID,
        address indexed asset,
        uint256 balance
    );

}