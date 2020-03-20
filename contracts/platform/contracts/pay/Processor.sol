pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

contract Processor {


    event SellerApprovalChanged(address indexed seller, bool approved);
    event SignerLimitChanged(address indexed signer, uint256 usdCentsLimit);
    event PaymentProcessed(address indexed buyer, )

    struct SellerLimit {

    }

    struct Receipt {

    }

    struct Limit {
        uint64 limit;
        uint64 processed;
        uint64 periodEnd;
    }

    struct Payment {
        uint256 usdCents;
        bytes32 signedReceipt;
        uint8 v;
        bytes32 r;
        bytes32 s;
    }

    // Track whether a contract can sell through this processor
    mapping(address => bool) public sellerApproved;
    // Track the daily limit of each signing address
    mapping(address => Limit) public signerLimits;
    // The number of payments this contract has processed
    uint256 public count;


    function process(bytes32 sku, uint quantity, Payment memory payment) public returns (uint) {

        require(sku != bytes32(0), "must have a set SKU");
        require(quantity > 0, "must have a valid quality");
        
        if (periodEnd > uint64(block.number)) {
            periodEnd += 
        }
        require (limit.processed + payment.usdCents > );
        limit.processed += payment.usdCents;

        uint id = count++;

        emit PaymentProcessed(id);

        return id;
    }

    function _decodeSignature(uint256 usdCents) internal {
        bytes32 sigHash = keccak256(abi.encodePacked(address(this), usdCents));
        address signer = ecrecover(hash, v, r, s);
    }

    function setSignerLimit(address signer, uint256 usdCentsLimit) public onlyOwner {
        signerLimit[signer] = usdCentsLimit;
        emit SignerLimitedChanged(signer, usdCentsLimit);
    }

    function setSellerApproval(address seller, bool approved) public onlyOwner {
        sellerApproved[seller][approved];
        emit SellerApprovalChanged(seller, approved);
    }

}