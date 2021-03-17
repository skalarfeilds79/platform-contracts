import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Contract, Signer } from 'ethers';

function getMintingBlob(tokenId: number) {
  return ethers.utils.toUtf8Bytes(
    `{${tokenId.toString()}}:{}`,
  );
}

describe('mintFor', function () {
  let card: Contract;
  let accounts: Signer[];

  beforeEach(async () => {
    accounts = await ethers.getSigners();

    const Card = await ethers.getContractFactory('Card', accounts[0]);
    card = await Card.deploy();
  });

  it('should work with valid arguments', async function () {
    const address = await accounts[0].getAddress();
    const tokenId = 1;
    const mintingBlob = getMintingBlob(tokenId);

    await expect(card.mintFor(address, 1, mintingBlob))
      .to.emit(card, 'CardMinted')
      .withArgs(address, 1, tokenId);

    expect(await card.tokenURI(tokenId)).to.equal(
      `https://api.immutable.com/asset/${card.address.toLowerCase()}/${tokenId}`,
    );
  });

  it('should reject users without permission', async function () {
    const address = await accounts[1].getAddress();
    const tokenId = 1;
    const mintingBlob = getMintingBlob(tokenId);

    card = card.connect(accounts[1]);

    await expect(card.mintFor(address, 1, mintingBlob)).to.be.reverted;
  });

});

describe('burn', function () {
  let card: Contract;
  let accounts: Signer[];

  beforeEach(async () => {
    accounts = await ethers.getSigners();

    const Card = await ethers.getContractFactory('Card', accounts[0]);
    card = await Card.deploy();
  });

  it('should work with valid arguments', async function () {
    const address = await accounts[0].getAddress();
    const tokenId = 1;
    const mintingBlob = getMintingBlob(tokenId);

    await card.mintFor(address, 1, mintingBlob);
    await expect(card.burn(tokenId)).to.emit(card, 'Transfer').withArgs(address, '0x0000000000000000000000000000000000000000', tokenId);
  });

  it('should reject users without permission', async function () {
    const address = await accounts[0].getAddress();
    const tokenId = 1;
    const mintingBlob = getMintingBlob(tokenId);

    await card.mintFor(address, 1, mintingBlob);
    card = card.connect(accounts[1]);
    await expect(card.burn(tokenId)).to.be.reverted;
  });
});

describe('grantRole', function () {
  let card: Contract;
  let accounts: Signer[];

  beforeEach(async () => {
    accounts = await ethers.getSigners();

    const Card = await ethers.getContractFactory('Card', accounts[0]);
    card = await Card.deploy();
  });

  it('should work with valid arguments', async function () {
    const address = await accounts[1].getAddress();
    const tokenId = 1;
    const mintingBlob = getMintingBlob(tokenId);

    await expect(card.grantRole(ethers.utils.formatBytes32String(''), address)).to.emit(card, 'RoleGranted');
    card = card.connect(accounts[1]);
    await expect(card.mintFor(address, 1, mintingBlob)).to.not.be.reverted;
  });

});
