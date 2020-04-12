pragma solidity 0.5.11;

contract IVendor {

    // MUST BE Emitted when a product is purchased from this vendor
    // purchaseID MUST BE unique in this contract
    event ProductPurchased(
        uint256 indexed purchaseID,
        uint256 indexed paymentID
    );

    // MUST BE Emitted when a product sold by this vendor is escrowed
    // purchaseID MUST BE unique in this contract
    event ProductEscrowed(
        uint256 indexed purchaseID,
        uint256 indexed escrowID
    );

}