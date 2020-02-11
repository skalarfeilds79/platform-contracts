/**
 *
 * The keys are numerical network ids to avoid confusion between multiple contract
 * staging environments on the same Ethereum network (main-staging, main-production)
 *
 * 1 = main net
 * 3 = ropsten
 * 42 = kovan
 * 531 = test-rpc
 *
 */

export default {
  HUMAN_FRIENDLY_NAMES: {
    1: 'main-net',
    3: 'ropsten',
    42: 'kovan',
    50: 'test-rpc',
  },
  WETH: {
    1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    3: '0xc778417e063141139fce010982780140aa0cd5ab',
    50: '0x0b1ba0af832d7c05fd64161e0db78e85978e8082',
  },
  ZERO_EX_EXCHANGE: {
    1: '0x080bf510fcbf18b91105470639e9561022937712',
    3: '0xbff9493f92a3df4b0429b6d00743b3cfb4c85831',
    50: '0x48bacb9266a570d521063ef5dd96e61686dbe788',
  },
  ZERO_EX_ERC20_PROXY: {
    1: '0x95e6f48254609a6ee006f7d493c8e5fb97094cef',
    3: '0xb1408f4c245a23c31b98d2c626777d4c0d766caa',
    50: '0x1dc4c1cefef38a777b15aa20260a54e584b16c48',
  },
  ZERO_EX_ERC721_PROXY: {
    1: '0xefc70a1b18c432bdc64b596838b4d138f6bc6cad',
    3: '0xe654aac058bfbf9f83fcaee7793311dd82f6ddb4',
    50: '0x1d7022f5b17d2f8b695918fb48fa1089c9f85401',
  },
  FUSING_MINTER: {
    1: '',
    3: '0xA80E99f59cd0474F76754Ed5498F2Ef6D6f09951',
    50: '0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb',
  },
  PROMO_FACTORY_MIN: {
    1: 501,
    3: 501,
    50: 501,
  },
  PROMO_FACTORY_MAX: {
    1: 999,
    3: 999,
    50: 999,
  },
};
