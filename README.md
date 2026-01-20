# Ether Lottery Game

A transparent, winner-takes-all lottery running on the Ethereum blockchain. This project demonstrates how to handle array manipulation, payable functions, and basic randomness in Solidity.

[Image of blockchain lottery flow diagram]

## 🎰 How It Works
1. **Enter**: Users send **0.1 ETH** to the contract to buy a "ticket".
2. **Pool**: ETH is stored securely in the contract balance.
3. **Pick Winner**: The manager (deployer) triggers the selection.
4. **Payout**: The contract calculates a random index, sends the entire balance to the winner, and resets the game.

## ⚠️ Educational Note
This contract uses `block.timestamp` and `block.prevrandao` for randomness. While sufficient for this demo, production apps holding high value should use **Chainlink VRF** to prevent miner manipulation.

## 🚀 Setup Guide

1. **Install Dependencies**
   ```bash
   npm install
