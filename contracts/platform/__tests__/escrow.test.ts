
import { Escrow, EscrowFactory, TestERC721, TestERC721Factory } from '../src/contracts';

import { Wallet, ethers } from 'ethers';

import { generatedWallets } from '@imtbl/test-utils';

const provider = new ethers.providers.JsonRpcProvider();

const wallets = generatedWallets(provider);

describe('Immutable Escrow Core', () => {

  describe('#constructor', () => {

    let escrow: Escrow;

    it('should be able to be deployed', async () => {
      escrow = await new EscrowFactory().deploy();
    });

  });

  describe('#escrowList', () => {

    let escrow: Escrow;
    let asset: TestERC721;
    let user = wallets[0].address;

    beforeEach(async () => {
      escrow = await new EscrowFactory().deploy();
      asset = await new TestERC721Factory().deploy();
    });

    it('should not be able to escrow 0 assets', async () => {

      await escrow.functions.escrowList(asset.address, [], user, user);

    });
    
    it('should not be able to escrow duplicate assets', async () => {

      await asset.functions.mint(1, user);

      await asset.functions.setApprovalForAll(escrow.address, true);

      await escrow.functions.escrowList(asset.address, [0, 0], user, user);

    });

    it('should not be able to escrow with a null releaser', async () => {

    });

    it('should not be able to escrow with a null owner');
    it('should not be able to escrow unowned assets');

    it('should be able to escrow assets this contract is approved to transfer');
    it('should be able to escrow assets this contract owns already');
  });

  describe('#escrowRange', () => {
    it('should not be able to escrow 0 assets');
    it('should not be able to escrow an invalid range');
    it('should not be able to escrow with a null releaser');
    it('should not be able to escrow with a null owner');
    it('should not be able to escrow unowned assets');

    it('should be able to escrow assets this contract is approved to transfer');
    it('should be able to escrow assets this contract owns already');
  });

  describe('#release', () => {
    it('should not be able to release from an invalid escrow account');
    it('should not be able to release assets without being the releaser');
    
    it('should be able to release from escrow as the releaser');
    it('should return released assets to the correct address');
  });
});
