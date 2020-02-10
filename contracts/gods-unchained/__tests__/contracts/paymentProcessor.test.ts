import 'jest';

describe('PaymentProcessor', () => {
  describe('#processPurchase', () => {
    it('should not be able to purchase without a valid address for the user');
    it('should not be able to purchase without a valid sku code');
    it('should not be able to purchase without a valid item cost');
    it('should not be able to specify a different number of affiliate addresses and amounts');
    it('should not be able to purchase without being approved for a valid code');
    it('should be able to process a purchase and emit the correct events');
  });

  describe('#getSellers', () => {
    it('should be able to get the correct sellers for an SKU code');
  });

  describe('#addSkuCode', () => {
    it('should not be able to add as an unauthorised user');
    it('should not be able to add a duplicate address');
    it('should be able to add a new SKU code seller');
  });
});
