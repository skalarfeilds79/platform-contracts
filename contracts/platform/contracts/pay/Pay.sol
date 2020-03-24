pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./IPay.sol";

// solhint-ignore security/no-block-members

contract Pay is IPay, Ownable {

    event SellerApprovalChanged(bytes32 indexed sku, address indexed seller, bool approved);
    event SignerLimitChanged(address indexed signer, uint64 usdCentsLimit);
    event PaymentProcessed(uint256 id, Order order, Payment payment);

    // Stores the nonce mapping
    mapping(address => mapping(uint256 => bool)) receiptNonces;
    // Track whether a contract can sell through this processor
    mapping(bytes32 => mapping(address => bool)) public sellerApproved;
    // Track the daily limit of each signing address
    mapping(address => Limit) public signerLimits;
    // The number of payments this contract has processed
    uint256 public count;

    function process(Order memory order, Payment memory payment) public payable returns (uint) {

        require(order.sku != bytes32(0), "must have a set SKU");
        require(order.quantity > 0, "must have a valid quality");
        require(sellerApproved[order.sku][msg.sender], "must be approved to sell this product");

        if (payment.currency == Currency.USDCents) {
            _checkReceiptAndUpdateSignerLimit(order, payment);
        } else if (payment.currency == Currency.ETH) {
            _processETHPayment(order.amount);
        } else {
            require(false, "unsupported payment type");
        }

        uint id = count++;

        emit PaymentProcessed(id, order, payment);

        return id;
    }

    function _checkReceiptAndUpdateSignerLimit(Order memory order, Payment memory payment) internal {

        address signer = _getSigner(payment);

        require(!receiptNonces[signer][payment.receipt.nonce], "nonce must not be used");
        receiptNonces[signer][payment.receipt.nonce] = true;

        _validateOrderPaymentMatch(order, payment);

        _updateSignerLimit(signer, order.amount);
    }

    function _validateOrderPaymentMatch(Order memory order, Payment memory payment) internal {
        ReceiptDetails memory details = payment.receipt.details;
        require(details.seller == msg.sender, "sellers must match");
        require(details.quantity == order.quantity, "quantities must match");
        require(details.sku == order.sku, "skus must match");
        require(details.usdCents >= order.amount, "receipt value must achieve ");
    }

    function _updateSignerLimit(address signer, uint256 amount) internal {
        Limit storage limit = signerLimits[signer];
        if (limit.periodEnd < block.timestamp) {
            limit.periodEnd = block.timestamp + 1 days;
            limit.processed = 0;
        }
        require (limit.limit > limit.processed + amount, "exceeds signing limit for this address");
        limit.processed += amount;
    }

    function _getSigner(Payment memory payment) internal view returns (address) {
        SignedReceipt memory receipt = payment.receipt;
        bytes32 sigHash = keccak256(abi.encode(
            address(this),
            receipt.nonce,
            receipt.details
        ));
        require(sigHash == receipt.signedHash, "hashes must match");
        return ecrecover(receipt.signedHash, receipt.v, receipt.r, receipt.s);
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
        require(msg.value >= amount, "must have provided enough ETH");
    }

}