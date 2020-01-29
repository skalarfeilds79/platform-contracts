const dotenv = require('dotenv');
const config = dotenv.config({ path: '../../.env' }).parsed;

const truffleConfig = require('../../truffle.config');

module.exports = {
  ...truffleConfig,
  api_keys: {
    etherscan: config.ETHERSCAN_KEY,
  },
};
