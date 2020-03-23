pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./IPay.sol";

contract Pay is IPay, Ownable {

    event SellerApprovalChanged(bytes32 indexed sku, address indexed seller, bool approved);
    event SignerLimitChanged(address indexed signer, uint64 usdCentsLimit);
    event PaymentProcessed(uint256 id, bytes32 sku, uint quantity, Payment payment);

    // Stores the nonce mapping
    mapping(address => mapping(uint256 => bool)) receiptNonces;
    // Track whether a contract can sell through this processor
    mapping(bytes32 => mapping(address => bool)) public sellerApproved;
    // Track the daily limit of each signing address
    mapping(address => Limit) public signerLimits;
    // The number of payments this contract has processed
    uint256 public count;

    function process(Order memory order, Payment memory payment) public payable returns (uint) {

        require(false, "my error");

        // require(order.sku != bytes32(0), "must have a set SKU");
        // require(order.qty > 0, "must have a valid quality");

        // if (payment.currency == Currency.USDCents) {
        //     _checkReceiptAndUpdateSignerLimit(order.amount, payment);
        // } else if (payment.currency == Currency.ETH) {
        //     _processETHPayment(order.amount);
        // } else {
        //     require(false, "unsupported payment type");
        // }

        uint id = count++;

        return id;
    }

    function _checkReceiptAndUpdateSignerLimit(uint256 amount, Payment memory payment) internal {

        address signer = _getSigner(payment);

        Limit storage limit = signerLimits[signer];

        if (limit.periodEnd < block.timestamp) {
            limit.periodEnd = block.timestamp + 1 days;
            limit.processed = 0;
        }

        require (limit.limit > limit.processed + payment.usdCents, "exceeds signing limit for this address");
        limit.processed += payment.usdCents;
    }

    function _getSigner(Payment memory payment) internal view returns (address) {
        bytes32 sigHash = keccak256(abi.encodePacked(address(this), payment.usdCents));
        return address(0);
        // require(sigHash == payment.receiptHash, "hashes must match");
        // return ecrecover(payment.receiptHash, payment.v, payment.r, payment.s);
    }

    function setSignerLimit(address signer, uint64 usdCentsLimit) public onlyOwner {
        signerLimits[signer].limit = usdCentsLimit;
        emit SignerLimitChanged(signer, usdCentsLimit);
    }

    function setSellerApproval(bytes32 sku, address seller, bool approved) public onlyOwner {
        sellerApproved[sku][seller] = approved;
        emit SellerApprovalChanged(sku, seller, approved);
    }

    function _processETHPayment(uint256 amount) internal {
        
    }

}