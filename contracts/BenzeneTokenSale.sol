pragma solidity >= 0.4.2

import "./BenzeneToken.sol";

contract BenzeneTokenSale{
    address payable admin;
    BenzeneToken public tokenContract
    unit256 public tokenPrice;
    uint256 public tokenSold;

    event Sell(address _buyer, uint256 _amount);

    constructor(BenzeneToken _tokenContract, unit256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    function multiply(unit x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }
}