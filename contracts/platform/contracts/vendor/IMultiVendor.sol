pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

contract IMultiVendor {

    struct Receipt {
        address vendor;
        uint256 purchaseID;
    }

    // MUST BE emitted when a bundle of products are purchased
    // bundleID MUST BE unique in this contract
    event ProductsPurchased(uint256 indexed bundleID, Receipt[] receipts);

}