pragma solidity ^0.5.0;

interface IProcessor {

    function processPayment(address user, uint cost, uint items, address referrer) external payable returns (uint id);
    
}