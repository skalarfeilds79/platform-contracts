pragma solidity 0.5.11;

import "./referral/IReferral.sol";
import "@imtbl/platform/contracts/escrow/ICreditCardEscrow.sol";
import "@imtbl/platform/contracts/pay/IProcessor.sol";

contract Product {

    using SafeMath for uint256;

    // Total number of this product which this contract can sell
    uint256 saleCap;
    // Total number of this product sold by this contract
    uint256 sold;
    // Price of each product sold by this contract
    uint256 price;
    // SKU of the product sold by this contract
    bytes32 sku;
    // Referral contract
    IReferral referral;
    // Escrow contract
    ICreditCardEscrow escrow;
    // Payment processor
    IProcessor processor;

    constructor(
        bytes32 _sku, uint256 _saleCap, uint _price,
        IReferral _referral, ICreditCardEscrow _escrow, IProcessor _processor
    ) public {
        sku = _sku;
        saleCap = _saleCap;
        price = _price;
        referral = _referral;
        escrow = _escrow;
    }

    function sell(uint256 qty) public {
        require(saleCap == 0 || saleCap >= sold + qty, "cap has been exhausted");
        sold += qty;
    }

    function available() public {
        return saleCap > sold;
    }


}