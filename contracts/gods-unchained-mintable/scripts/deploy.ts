import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  console.log('Deploying Card...')
  const Card = await ethers.getContractFactory("Card");
  const card = await Card.deploy();
  console.log(`Transaction created: https://ropsten.etherscan.io/tx/${card.deployTransaction.hash}`);
  await card.deployed();

  console.log("Card deployed to:", card.address);
  fs.writeFileSync("address.txt", card.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
