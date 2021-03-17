import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import dotenv from "dotenv";
dotenv.config()

function getEnv(val: string): string {
  if (val in process.env) {
    return (process.env as any)[val];
  }

  throw `Missing env ${val}`;
}

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.7.3",
  networks: {
    hardhat: {
    },
    ropsten: {
      url: getEnv('ROPSTEN_ETH_URL'),
      accounts: [getEnv('ROPSTEN_PRIVATE_KEY')]
    }
  },
  etherscan: {
    apiKey: getEnv('ETHERSCAN_KEY')
  }
};

export default config;
