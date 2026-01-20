// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Lottery {
    address public manager;
    address[] public players;
    address public lastWinner;
    uint256 public lastPayout;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether, "Minimum 0.01 ETH to enter");
        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        // Pseudo-random generator (Note: Use Chainlink VRF for Mainnet)
        return uint(keccak256(abi.encodePacked(block.prevrandao, block.timestamp, players)));
    }

    function pickWinner() public restricted {
        require(players.length > 0, "No players in the lottery");
        
        uint index = random() % players.length;
        address winner = players[index];
        
        lastWinner = winner;
        lastPayout = address(this).balance;
        
        // Transfer entire balance to winner
        payable(winner).transfer(address(this).balance);
        
        // Reset the array for the next round
        players = new address[](0);
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    modifier restricted() {
        require(msg.sender == manager, "Only manager can pick winner");
        _;
    }
}
