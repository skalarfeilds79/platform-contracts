<p align="center"><img src="https://cdn.dribbble.com/users/1299339/screenshots/7133657/media/837237d447d36581ebd59ec36d30daea.gif" width="280"/></p>

<p align="center">Immutable is the creator behind the hit game - Gods Unchained. Here is a mono-repo containing all the code for our public contracts.</p>

<p align="center">
  <a href="https://solidity.readthedocs.io/en/develop/index.html">
    <img src="https://img.shields.io/badge/SOLIDITY-0.5.11-orange.svg" />
  </a>
  <a href="https://opensource.org/licenses/Apache-2.0">
    <img src="https://img.shields.io/badge/LICENSE-APACHE2.0-3DA639.svg" />
  </a>
</p>

## Packages :package:

### Contracts

|                            Package                             |                                                                Version                                                                |                           Description                           |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| [`@imtbl/gods-unchained`](/contracts/gods-unchained)                                     | [![npm](https://img.shields.io/npm/v/@imtbl/gods-unchained.svg)](https://www.npmjs.com/package/@imtbl/gods-unchained)                                                 | Gods Unchained smart contracts and typings       |
| [`@imtbl/immutable-wallet`](/contracts/immutable-wallet)                                   | [![npm](https://img.shields.io/npm/v/@imtbl/immutable-wallet.svg)](https://www.npmjs.com/package/@imtbl/immutable-wallet)                                               | Immutable Smart Contract Wallet contracts and typings                    |

### Published

|                            Package                             |                                                                Version                                                                |                           Description                           |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| [`@imtbl/addresses`](/packages/addresses)                                     | [![npm](https://img.shields.io/npm/v/@imtbl/addresses.svg)](https://www.npmjs.com/package/@imtbl/addresses)                                                 | Public addresses of deloyed contracts       |
| [`@imtbl/artifacts`](/packages/artifacts)                                   | [![npm](https://img.shields.io/npm/v/@imtbl/artifacts.svg)](https://www.npmjs.com/package/@imtbl/artifacts)                                               | ABIs of all the main contracts needed for development                    |
| [`@imtbl/tests-utils`](/packages/test-utils)                 | [![npm](https://img.shields.io/npm/v/@imtbl/test-utils.svg)](https://www.npmjs.com/package/@imtbl/test-utils)                 | Developer utilities                                             |
| [`@imtbl/utils`](/packages/utils)                 | [![npm](https://img.shields.io/npm/v/@imtbl/utils.svg)](https://www.npmjs.com/package/@imtbl/test-utils)                 | Utilities while developing with our contracts                                             |
| [`@imtbl/types`](/packages/types)                         | [![npm](https://img.shields.io/npm/v/@imtbl/types.svg)](https://www.npmjs.com/package/@imtbl/types)                         | Shared type declarations                                        |

### Private

|                       Package                        |              Description              |
| ---------------------------------------------------- | ------------------------------------- |
| [`@imtbl/deployment`](/packages/deployment)       | Immutable contract deployment scripts   |
| [`@imtbl/order-generator`](/packages/order-generator)                 | Order generator used for testing |


## Addresses :innocent:

We get it, you're just here to find the contract addresses. Luckily for you, they're all listed here.

### Contracts (Main Net)

| Contract Name | Address |
| ------------- | ------- |
| `Cards` | [0x0e3a2a1f2146d86a604adc220b4967a898d7fe07](https://etherscan.io/address/0x0e3a2a1f2146d86a604adc220b4967a898d7fe07) |
| `Forwarder` | [0xb04239b53806ab31141e6cd47c63fb3480cac908](https://etherscan.io/address/0xb04239b53806ab31141e6cd47c63fb3480cac908) |

### Dependencies  (Main Net)

| Contract Name | Address |
| ------------- | ------- |
| `Wrapped Ether` | [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) |
| `0x Exchange` | [0x080bf510fcbf18b91105470639e9561022937712](https://etherscan.io/address/0x080bf510fcbf18b91105470639e9561022937712) |
| `0x ERC20 Proxy` | [0x95e6f48254609a6ee006f7d493c8e5fb97094cef](https://etherscan.io/address/0x95e6f48254609a6ee006f7d493c8e5fb97094cef) |
| `0x ERC721 Proxy` | [0xefc70a1b18c432bdc64b596838b4d138f6bc6cad](https://etherscan.io/address/0xefc70a1b18c432bdc64b596838b4d138f6bc6cad) |

### Contracts (Ropsten)

| Contract Name | Address |
| ------------- | ------- |
| `Cards` | [0xADC559D1afbCBBf427728577F40E7358D96F1209](https://ropsten.etherscan.io/address/0xADC559D1afbCBBf427728577F40E7358D96F1209) |
| `OpenMinter` | [0x36F26280B80e609e347c843E2AE5351Ee4b5f7eD](https://ropsten.etherscan.io/address/0x36F26280B80e609e347c843E2AE5351Ee4b5f7eD) |
| `Forwarder` | [0xc79C9c624ea8A3dEdfae0dbf9295Bfb159eE5F3b](https://ropsten.etherscan.io/address/0xc79C9c624ea8A3dEdfae0dbf9295Bfb159eE5F3b) |
| `Fusing` | [0x82a92540aB10F484Bf11fB3bEd95CE35c370846E](https://ropsten.etherscan.io/address/0x82a92540aB10F484Bf11fB3bEd95CE35c370846E) |

### Dependencies (Ropsten)

| Contract Name | Address |
| ------------- | ------- |
| `Wrapped Ether` | [0xc778417e063141139fce010982780140aa0cd5ab](https://ropsten.etherscan.io/address/0xc778417e063141139fce010982780140aa0cd5ab) |
| `0x Exchange` | [0xbff9493f92a3df4b0429b6d00743b3cfb4c85831](https://ropsten.etherscan.io/address/0xbff9493f92a3df4b0429b6d00743b3cfb4c85831) |
| `0x ERC20 Proxy`| [0xb1408f4c245a23c31b98d2c626777d4c0d766caa](https://ropsten.etherscan.io/address/0xb1408f4c245a23c31b98d2c626777d4c0d766caa) |
| `0x ERC721 Proxy` | [0xe654aac058bfbf9f83fcaee7793311dd82f6ddb4](https://ropsten.etherscan.io/address/0xe654aac058bfbf9f83fcaee7793311dd82f6ddb4) |


### Repo Guide

While we've done our best to simplify the repo setup as much as possible, there's some steps we require.

##### Step 0:

Ensure you're using Node `v11.15.0`. Unfortunately a few low-level libraries such as scrypt and node-gyp fail to compile on Node 12.
For this reason we recommend using v11.15.0 to ensure everything can install correctly.

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
nvm install v11.15.0
nvm use v11.15.0
```

If you use ZSH:
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

##### Step 1:

Install required global dependencies

```
npm install -g lerna
npm install -g typescript@2.6.2
```

##### Step 2:

Install all the required local dependencies. Lerna will ensure all local dependenices are setup correctly.

```
lerna bootstrap
```

##### Step 3

Run a local blockchain instance on your localhost. We recommend opening this in a new terminal window/tab.

```
yarn chain
```

##### Step 4

Compile all packages. This will compile all the contracts and generate all the relevant Typescript bindings for other repos to work. 
Tests will run to ensure everything works as expected.

```
yarn setup && yarn yarn test
```

### Creating Test Cards

In order to generate test cards on your local blockchain or testnet deployment, follow these steps.

##### Step 1

Create a copy of `.env.defaults` and rename it to `.env`

##### Step 2
Fill out all the required variables inside the .env file. You don't need `ETHERSCAN_KEY` unless you want verified contracts on Etherscan.

> Make sure to set DEPLOYMENT_NETWORK_ID for 50 if testing locally.

##### Step 3

Run `yarn deploy-cards` - that's it!
Your newly deployed cards will be on your specified chain and you'll be able to see them in the specified DB!
