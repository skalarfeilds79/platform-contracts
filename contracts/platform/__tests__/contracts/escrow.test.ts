import { Escrow, EscrowFactory } from "../../src/contracts";
import { Blockchain, expectRevert, generatedWallets } from '@imtbl/test-utils';

describe('Immutable Escrow Core', () => {

  describe('#constructor', () => {

    let escrow: Escrow;

    it('should be able to be deployed', async () => {
      escrow = await new EscrowFactory().deploy();
    });

  });

  describe('#escrowList', () => {

    let escrow: Escrow;

    beforeEach(async () => {
      escrow = await new EscrowFactory().deploy();
    });

    it('should not be able to escrow 0 assets', async () => {

    });


    
    it('should not be able to escrow duplicate assets');
    it('should not be able to escrow with a null releaser');
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
