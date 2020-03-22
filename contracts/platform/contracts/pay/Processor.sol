pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./IProcessor.sol";

contract Processor is IProcessor, Ownable {

    event SellerApprovalChanged(bytes32 indexed sku, address indexed seller, bool approved);
    event SignerLimitChanged(address indexed signer, uint64 usdCentsLimit);
    event PaymentProcessed(uint256 id, bytes32 sku, uint quantity, Payment payment);

    // Track whether a contract can sell through this processor
    mapping(bytes32 => mapping(address => bool)) public sellerApproved;
    // Track the daily limit of each signing address
    mapping(address => Limit) public signerLimits;
    // The number of payments this contract has processed
    uint256 public count;


    function process(bytes32 sku, uint quantity, uint totalPrice, Payment memory payment) public returns (uint) {

        require(sku != bytes32(0), "must have a set SKU");
        require(quantity > 0, "must have a valid quality");

        if (payment.currency == Currency.Fiat) {
            _checkReceiptAndUpdateSignerLimit(totalPrice, payment);
        } else if (payment.currency == Currency.ETH) {
            _processETHPayment(totalPrice);
        } else {
            require(false, "unsupported payment type");
        }

        uint id = count++;

        emit PaymentProcessed(id, sku, quantity, payment);

        return id;
    }

    function _checkReceiptAndUpdateSignerLimit(uint totalPrice, Payment memory payment) internal {

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
        return address(0);
        // bytes32 sigHash = keccak256(abi.encodePacked(address(this), payment.usdCents));
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

    function _processETHPayment(uint totalPrice) internal {
        
    }

}