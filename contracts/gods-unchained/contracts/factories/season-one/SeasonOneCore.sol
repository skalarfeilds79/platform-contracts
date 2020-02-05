pragma solidity ^0.5.11;

contract SeasonOneCore {

    enum PackType {
        Rare, 
        Epic, 
        Legendary, 
        Shiny
    }

    enum Status {
        Revoked,
        Claimed
    }

    struct Purchase {
        Type packType;
        Status status; // Experimental
        uint256 count;
        uint256 randomness;
        uint256[] tokenIds; // Experimental
        uint64 commit;
        uint64 lockup;
        bool revoked;
        address user;
    }

    struct PackInstance {
        uint256 price;
        uint256 chestSize;
        address chestToken;
    }

    // Total number of protos in this seasons
    uint256 public protosTotal;

    // Proto number the season starts from
    uint256 public protoStart;

    // Mapping of approved Sesone One sellers
    mapping (address => bool) approvedSellers;

    event PackCreated();

    event SellerApproved();

    event PaymentProcessed();

    event PurchaseRecorded();

    event PackRandomnessCommitted();

    // Create the pack itself
    function createPack() public {}

    // Process the payment by sending allocations to referrer etc.
    function processPayment() public {}

    // Record purchase
    function packRedeemed() public {}

    // Can be called again to recommit
    function commitPackRandomness() public {}

    // Predict contents of pack via randomness
    function predictPackDetails() public {}

    // Predict card details via randomness seed
    function predictCardDetails() public {}

}