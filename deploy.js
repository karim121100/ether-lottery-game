const hre = require("hardhat");

async function main() {
  const Lottery = await hre.ethers.getContractFactory("Lottery");
  const lottery = await Lottery.deploy();

  await lottery.deployed();

  console.log("Lottery Contract deployed to:", lottery.address);
  console.log("Copy this address into app.js!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
