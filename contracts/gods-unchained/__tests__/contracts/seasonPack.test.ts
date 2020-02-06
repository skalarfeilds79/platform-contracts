describe('SeasonPack', () => {
  describe('#constructor', () => {
    it('should set the correct variables');
  });

  describe('#purchasePack', () => {
    it('should not be able to purchase 0 packs');
    it('should not be able to purchase with no user set');
    it('should not be able to purchase with an invalid pack type');
    it('should not be able to purchase more than the limit');
    it('should not be able to purchase with insufficient funds');
    it('should be able to purchase with the correct events emitted');
    it('should be able to purchase with the correct referral amount sent and recorded');
  });

  describe('#purchaseViaReceipt', () => {
    it('should not be able to purchase with no user set');
    it('should not be able to purchase with no lockup set');
    it('should not be able to purchase with an invalid signature');
    it('should not be able to purchase with the same receipt');
    it('should be able to purchase with the correct events emitted');
  });
});
