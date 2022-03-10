// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, run } from "hardhat";

const CONFIRMATIONS = 6;

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Courage = await ethers.getContractFactory("Courage");
  const courage = await Courage.deploy();

  await courage.deployed();

  console.log("Courage deployed to:", courage.address);
  console.log("Waiting for confirmations before verifying on Etherscan.");
  for (let i = 0; i < CONFIRMATIONS; i++) {
    console.log("Confirmations remaining:", CONFIRMATIONS - i);
    await courage.deployTransaction.wait(i);
  }
  console.log("Verifying.");
  await run("verify:verify", { address: courage.address });
  console.log("Verification complete!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
