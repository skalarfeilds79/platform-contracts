pragma solidity 0.5.11;


interface IEscrowCallbackReceiver {

    function onEscrowCallback() external returns (bytes4);

}