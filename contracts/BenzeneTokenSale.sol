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

    function buyTokens(uint256 _numberOfTokens) public payable {
        require(msg.value == multiply(_numberOfTokens, tokenPrice));

        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);

        require(tokenContract.transfer(msg.sender, _numberOfTokens));

        tokenSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }

    }
}