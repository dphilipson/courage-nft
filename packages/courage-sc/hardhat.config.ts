import { exec } from "child_process";
import * as dotenv from "dotenv";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// Extend the compile task to copy artifacts to frontend.
task("compile").setAction(async (_, __, runSuper) => {
  await runSuper();
  exec("scripts/copy-artifacts-to-dependents.sh");
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const { ETHERSCAN_API_KEY, MAINNET_URL, GOERLI_URL, RINKEBY_URL, PRIVATE_KEY } =
  process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    mainnet: {
      url: notNull(MAINNET_URL),
      accounts: [notNull(PRIVATE_KEY)],
    },
    goerli: {
      url: notNull(GOERLI_URL),
      accounts: [notNull(PRIVATE_KEY)],
    },
    rinkeby: {
      url: notNull(RINKEBY_URL),
      accounts: [notNull(PRIVATE_KEY)],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    currency: "USD",
  },
  etherscan: { apiKey: notNull(ETHERSCAN_API_KEY) },
};

function notNull<T>(x: T | null | undefined): T {
  if (x == null) {
    throw new Error("Unexpected absent value.");
  }
  return x;
}

export default config;
