// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { run, ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const card = await ethers.getContractAt("Card", "0x6c560E869C0fE614A4bbD9D75d598E19DDB68200");

  const testAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
  const tokenId = 112;
  const proto = 5;
  const quality = 1;
  const mintingBlob = ethers.utils.toUtf8Bytes(
    `{${tokenId.toString()}}:{${proto.toString()},${quality.toString()}}`,
  );

  await card.mintFor(testAddress, '0', mintingBlob);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
