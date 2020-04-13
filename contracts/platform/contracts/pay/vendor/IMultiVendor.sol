pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

contract IMultiVendor {

    // MUST BE emitted when a bundle of products are purchased
    // bundleID MUST BE unique in this contract
    event ProductsPurchased(uint256 indexed bundleID, uint256[] paymentIDs);

}