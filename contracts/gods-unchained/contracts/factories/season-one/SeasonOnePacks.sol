pragma solidity ^0.5.11;

import "./SeasonOneCore.sol";

contract SeasonOne {

    // Access to core functions
    SeasonOneCore private core;

    // Limit how many cards can be sold
    uint256 public SALE_CAP;
    
    event PackPurchased();

    function constructor() public {}

    // Purchase the pack via some currency
    function purchasePack() public {}

    // Purchase the pack via some signed receipt
    function purchasePackViaReceipt() public {}

}