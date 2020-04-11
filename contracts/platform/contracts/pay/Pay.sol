pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./IPay.sol";

contract Pay is IPay, Ownable {

    using SafeMath for uint256;

    // Emitted when a seller's approval to sell a particular product is changed
    event SellerApprovalChanged(bytes32 indexed sku, address indexed seller, bool approved);
    // Emitted when a signer's limit is changed
    event SignerLimitChanged(address indexed signer, uint256 usdCentsLimit);
    // Emitted when a payment has been processed
    event PaymentProcessed(uint256 indexed id, Order order, Payment payment);

    // Stores whether a nonce has been used by a particular signer
    mapping(address => mapping(uint256 => bool)) public receiptNonces;
    // Track whether a contract can sell through this processor
    mapping(bytes32 => mapping(address => bool)) public sellerApproved;
    // Track the daily limit of each signing address
    mapping(address => Limit) public signerLimits;
    // The number of payments this contract has processed
    uint256 public count;

    /** @dev Process an order
     *
     * @param order the details of the order, supplied by an authorised seller
     * @param payment the details of the user's proposed payment
     */
    function process(Order memory order, Payment memory payment) public payable returns (uint) {

        require(order.sku != bytes32(0), "must have a set SKU");
        require(order.quantity > 0, "must have a valid quality");
        require(sellerApproved[order.sku][msg.sender], "must be approved to sell this product");

        if (payment.currency == Currency.USDCents) {
            _checkReceiptAndUpdateSignerLimit(order, payment);
        } else if (payment.currency == Currency.ETH) {
            _processETHPayment(order.totalPrice);
        } else {
            require(false, "unsupported payment type");
        }

        uint id = count++;

        emit PaymentProcessed(id, order, payment);

        return id;
    }

    function _checkReceiptAndUpdateSignerLimit(Order memory order, Payment memory payment) internal {

        address signer = _getSigner(order, payment);

        _updateSignerLimit(signer, order.totalPrice);

        require(!receiptNonces[signer][payment.nonce], "nonce must not be used");
        receiptNonces[signer][payment.nonce] = true;

        _validateOrderPaymentMatch(order, payment);

    }

    function _validateOrderPaymentMatch(Order memory order, Payment memory payment) internal pure {
        require(payment.value >= order.totalPrice, "receipt value must be sufficient");
        require(order.currency == Currency.USDCents, "receipt currency must match");
    }

    function _updateSignerLimit(address signer, uint256 amount) internal {
        Limit storage limit = signerLimits[signer];
        require(limit.total > 0, "invalid signer");
        if (limit.periodEnd < block.timestamp) {
            limit.periodEnd = block.timestamp + 1 days;
            limit.used = 0;
        }
        uint nextUsed = limit.used.add(amount);
        require (limit.total >= nextUsed, "exceeds signing limit for this address");
        limit.used = nextUsed;
    }

    function _getSigner(Order memory order, Payment memory payment) internal view returns (address) {
        bytes32 sigHash = keccak256(abi.encodePacked(
            address(this),
            msg.sender,
            order.recipient,
            order.sku,
            order.quantity,
            payment.nonce,
            payment.escrowFor,
            payment.value,
            payment.currency
        ));
        bytes32 recoveryHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", sigHash));
        return ecrecover(recoveryHash, payment.v, payment.r, payment.s);
    }

    function setSignerLimit(address signer, uint256 usdCentsLimit) public onlyOwner {
        signerLimits[signer].total = usdCentsLimit;
        emit SignerLimitChanged(signer, usdCentsLimit);
    }

    function setSellerApproval(address seller, bytes32[] memory skus, bool approved) public onlyOwner {
        for (uint i = 0; i < skus.length; i++) {
            bytes32 sku = skus[i];
            sellerApproved[sku][seller] = approved;
            emit SellerApprovalChanged(sku, seller, approved);
        }
    }

    function _processETHPayment(uint256 amount) internal {
        require(msg.value >= amount, "must have provided enough ETH");
    }

}