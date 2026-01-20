const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery", function () {
  it("Allows entry and picks a winner", async function () {
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();
    await lottery.deployed();
    const [manager, player1] = await ethers.getSigners();

    // Player enters
    await lottery.connect(player1).enter({ value: ethers.utils.parseEther("0.02") });
    
    // Check pool balance
    const balance = await ethers.provider.getBalance(lottery.address);
    expect(balance).to.equal(ethers.utils.parseEther("0.02"));

    // Check players array
    const players = await lottery.getPlayers();
    expect(players[0]).to.equal(player1.address);

    // Pick Winner (Only manager)
    await lottery.pickWinner();
    
    // Array should be empty now
    const newPlayers = await lottery.getPlayers();
    expect(newPlayers.length).to.equal(0);
  });
});
