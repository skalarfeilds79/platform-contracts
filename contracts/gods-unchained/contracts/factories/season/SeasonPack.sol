pragma solidity ^0.5.11;

import "./SeasonCore.sol";

contract SeasonOne {

    // Access to core functions
    SeasonCore private core;

    // Limit how many cards can be sold
    uint256 public SALE_CAP;
    
    event PackPurchased();

    function constructor() public {}

    /**
     * @dev Purchase a pack of cards.
     *
     * @param _count Number of packs to purchase
     * @param _affiliate Address to earn a cut from sale
     */
    function purchasePack() public {}

    /**
     * @dev Purchase a pack of cards on behalf of another user.
     *
     * @param _user User to purchase the pack of cards on behalf of.
     * @param _count Number of packs to purchase
     * @param _affiliate Address to earn a cut from the sale
     */

    /**
     * @dev // TODO: Purchase a pack via a signed receipt.
     */
    function purchasePackViaReceipt() public {}

}