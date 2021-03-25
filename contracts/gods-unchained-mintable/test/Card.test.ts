import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Contract, Signer } from 'ethers';

function getMintingBlob(tokenId: number, proto: number, quality: number) {
  return ethers.utils.toUtf8Bytes(`{${tokenId.toString()}}:{${proto},${quality}}`);
}

const baseUri = 'https://api.immutable.com/asset/';

describe('mintFor', function () {
  let card: Contract;
  let accounts: Signer[];

  beforeEach(async () => {
    accounts = await ethers.getSigners();

    const Card = await ethers.getContractFactory('Card', accounts[0]);
    card = await Card.deploy(baseUri);
  });

  it('should work with valid arguments', async function () {
    const address = await accounts[0].getAddress();
    const tokenId = 1;
    const mintingBlob = getMintingBlob(tokenId, 2, 3);

    await expect(card.mintFor(address, 1, mintingBlob))
      .to.emit(card, 'CardMinted')
      .withArgs(address, 1, tokenId, 2, 3);

    expect(await card.tokenURI(tokenId)).to.equal(
      `${baseUri}${card.address.toLowerCase()}/${tokenId}`,
    );

    const details = await card.getDetails(tokenId);
    expect(details.proto).to.equal(2);
    expect(details.quality).to.equal(3);
  });

  it('should reject users without permission', async function () {
    const address = await accounts[1].getAddress();
    const tokenId = 1;
    const mintingBlob = getMintingBlob(tokenId, 2, 3);

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
    card = await Card.deploy(baseUri);
  });

  it('should work with valid arguments', async function () {
    const address = await accounts[0].getAddress();
    const tokenId = 1;
    const mintingBlob = getMintingBlob(tokenId, 2, 3);

    await card.mintFor(address, 1, mintingBlob);
    await expect(card.burn(tokenId))
      .to.emit(card, 'Transfer')
      .withArgs(address, '0x0000000000000000000000000000000000000000', tokenId);
  });

  it('should reject users without permission', async function () {
    const address = await accounts[0].getAddress();
    const tokenId = 1;
    const mintingBlob = getMintingBlob(tokenId, 2, 3);

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
    card = await Card.deploy(baseUri);
  });

  it('should work with valid arguments', async function () {
    const address = await accounts[1].getAddress();
    const tokenId = 1;
    const mintingBlob = getMintingBlob(tokenId, 2, 3);

    await expect(card.grantRole(ethers.utils.formatBytes32String(''), address)).to.emit(
      card,
      'RoleGranted',
    );
    card = card.connect(accounts[1]);
    await expect(card.mintFor(address, 1, mintingBlob)).to.not.be.reverted;
  });
});
