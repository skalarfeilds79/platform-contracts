import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract IEtherToken is IERC20 {
    function deposit() public payable;
    function withdraw(uint256 _amount) public;
    function withdrawTo(address _to, uint256 _amount) public;
}