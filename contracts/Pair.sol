/* SPDX-License-Identifier: MIT */
pragma solidity ^0.6.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract Pair {

    using SafeMath for uint;

    IERC20 public token;

    constructor(IERC20 _token) public {
        token = _token;
    }

    function addLiquidity(uint amount) public payable {
        token.transferFrom(msg.sender, address(this), amount);
    }

    function calculateBuyPrice(uint value, uint etherValue, uint tokenValue) pure public returns (uint) {
        return value * tokenValue / etherValue;
    }

    function buy() public payable {
        uint amount = calculateBuyPrice(msg.value, address(this).balance-msg.value, token.balanceOf(address(this)));
        token.transfer(msg.sender, amount);
    }

    function sell(uint amount) public {
        token.transferFrom(msg.sender, address(this), amount);
        msg.sender.transfer(amount / 2);
    }
}