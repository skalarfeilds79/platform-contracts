pragma solidity ^0.5.11;

contract SeasonCore {

    enum Status {
        Revoked,
        Claimed
    }

    struct Season {
        uint256 totalProtos;
        uint256 startProto;
        mapping (bytes32 => PackInstance) packs;
    }

    struct Purchase {
        bytes32 packId;
        Status status; // Experimental
        uint256 count;
        uint256 randomSeed;
        uint256[] tokenIds; // Experimental
        uint64 commit;
        uint64 lockup;
        bool revoked;
        address user;
    }

    struct PackInstance {
        string name;
        uint256 price;
        uint256 chestSize;
        address chestAddress;
        address packAddress;
    }

    mapping (uint8 => Season) seasons;
    mapping (uint256 => Purchase) purchases;

    event SeasonCreated();

    event PackCreated();

    event SellerApproved();

    event PaymentProcessed();

    event PurchaseRecorded();

    event PackRandomnessCommitted();

    /**
     * @dev Create a new season of cards to sell
     *
     * @param _totalProtos The total number of protos to mint this season
     * @param _startProtos The starting proto number of this season
    */
    function createSeason(
        uint256 _totalProtos,
        uint256 _startProtos,
    ) public {}

    /**
     * @dev Create a new pack within a season
     *
     * @param _season The season number to create 
     * @param _name Human readable name of this pack
     * @param _price Price of the pack (no specific currency)
     * @param _chestSize Number of packs in a chest
     * @param _chestAddress Address of the chest implementation
     * @param _packAddress Address of the pack implementation
     */
    function createPack(
        uint8 _season,
        string _name,
        uint256 _price,
        uint256 _chestSize,
        address _chestAddress,
        address _packAddress
    ) public {}

    /**
     * @dev Process a payment made and handle referrals as well
     * Important to note that not all payments equal to redemptions.
     *
     * @param _user The user who owns the cards
     * @param _cost How much was paid per item
     * @param _itemsCount How many items were purchased
     * @param _affiliateAddresses Who were the affiliates
     * @param _affiliateAmounts How much is each affiliate to recieve
     */
    function processPayment(
        address payable _user,
        uint256 _cost,
        uint8 _itemsCount,
        address[] payable _affiliateAddresses
        uint256[] _affiliateAmounts
    ) public {}

    /**
     * @dev Redeem a pack after the purchase has been made via receipt, tokens or eth
     *
     * @param _season The season in which to redeem the pack
     * @param _packId The id of the pack purchased
     * @param _itemCount Number of items redeemed
     * @param _lockUp How long do we need to keep this locked for
     * @param _user Which user do these cards belong to
     */
    function packRedeemed(
        uint8 _season,
        bytes32 _packId,
        uint256 _itemCount,
        uint64 _lockUp,
        address _user
    ) public {}

    /**
     * @dev Generate the randomness for the cards to be minted
     * 
     * @param _purchaseId The id of the purchase to commit randomness to
     */
    function commitPackRandomness(
        uint256 _purchaseId
    ) public {}

    /**
     * @dev Predict the pack details using the randomness
     * 
     * @param _season Which season is the pack in
     * @param _purchaseId The id of the purchase to get randomness from
     */
    function predictPackDetails(
        uint8 _season,
        uint256 _purchaseId
    ) public {}

    /**
     * @dev Predict the details of a card using the randomness seed
     *
     * @param _season Which season is the pack in
     * @param _purchaseId The id of the purchase to get randomness from
     */
    function predictCardDetails(
        uint8 _season,
        uint256 _randomSeed
    ) public {}

}