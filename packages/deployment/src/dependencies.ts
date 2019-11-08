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
      50: 'test-rpc'
    },
    WETH: {
        3: "0xc778417e063141139fce010982780140aa0cd5ab"
    },
    ZERO_EX_EXCHANGE: {
        3: "0xbff9493f92a3df4b0429b6d00743b3cfb4c85831"
    },
    ZERO_EX_ERC20_PROXY: {
        3: "0xb1408f4c245a23c31b98d2c626777d4c0d766caa"
    },
    ZERO_EX_ERC721_PROXY: {
        3: "0xe654aac058bfbf9f83fcaee7793311dd82f6ddb4"
    }
  };