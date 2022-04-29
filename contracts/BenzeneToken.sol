pragma solidity >=0.4.2;

contract BenzeneToken{

    string public name = "Benzene Coin";
    string public symbol = "FURAN";
    string public standard = "Benzene Coin v1.0";
    uint public totalSupply;

    event transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );




}
