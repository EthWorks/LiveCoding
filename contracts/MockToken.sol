/* SPDX-License-Identifier: MIT */
pragma solidity ^0.6.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {
    constructor() ERC20('Asstronomical', 'Ass') public {        
        _mint(msg.sender, 1000 * 10 ** 18);
    }
}