import { ethers, hardhatArguments } from "hardhat";
import fs from "fs";

async function main() {
  if (!hardhatArguments.network) {
    throw new Error("Unknown network");
  }
  const Card = await ethers.getContractFactory("Card");
  console.log("Deploying Card...");

  const baseUri = `https://${hardhatArguments.network == "mainnet" ? "" : "test-"}api.immutable.com/asset/`;

  // For overriding nonce
  // const provider = (await ethers.getSigners())[0];
  // const deployTx = Card.getDeployTransaction(baseUri);
  // deployTx.nonce = 2383;
  // deployTx.gasPrice = 150000000000;
  // deployTx.gasLimit = 10000000;
  // const gas = await provider.estimateGas(deployTx);
  // console.log(gas);
  // const tx = await provider.sendTransaction(deployTx);
  // console.log(tx);
  // return;

  const card = await Card.deploy(baseUri);
  console.log(
    `Transaction created: https://${hardhatArguments.network == "mainnet" ? "" : hardhatArguments.network + "."}etherscan.io/tx/${card.deployTransaction.hash}`,
  );
  await card.deployed();

  console.log("Card deployed to:", card.address);
  fs.writeFileSync(`${hardhatArguments.network}-address.txt`, card.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
