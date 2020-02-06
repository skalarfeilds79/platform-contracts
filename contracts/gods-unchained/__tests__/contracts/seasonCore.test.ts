describe('SeasonCore', () => {
  describe('#createPack', () => {
    it('should not be able to create with price set as zero');
    it('should not be able to create with an invalid chest token');
    it('should not be able to create as an unauthorised user');
    it('should not be able to create if there are existing details');
    it('should be able to create a pack with the correct events emitted');
  });

  describe('#processPayment', () => {});
  describe('#packRedeemed', () => {});
  describe('#commitPackRandomness', () => {});

  describe('#predictPackDetails', () => {
    it('should return a valid result');
  });

  describe('#predictCardDetails', () => {
    it('should return a valid result');
  });
});
