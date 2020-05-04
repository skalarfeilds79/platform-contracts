/* tslint:disable */

export const outputs = {
  "1-production": {
    "human_friendly_name": "main-net-production",
    "addresses": {
      "LegacyCards": "0x6EbeAf8e8E946F0716E6533A6f2cefc83f60e8Ab",
      "Cards": "0x0e3a2a1f2146d86a604adc220b4967a898d7fe07",
      "Forwarder": "0xb04239b53806ab31141e6cd47c63fb3480cac908",
      "Fusing": "0x7c633611d9199Faff68bCE5c5Ad97d3514319B77",
      "S3PromoFactory": "0x28A54b2b798Bb8b8751D1Cd423A435472a009272",
      "S5PromoFactory": "0x8eB207F54846614Aebe3335DF2BD351823a04316",
      "Forge": "0x604b7a4a8ad3c4bc876c660a74b1a6e147b156c0",
      "BLACKLIST_Fusing": "0x833EA312aC6Ef27d2ca40BF247B0c5edbe991314",
      "EtherbotsMigration": "0xa777967d22043BE43f8fAd3552AD486f3765FD29",
      "ChimeraMigration": "0xc0f1eE9884Be19c4bB2e31F505f7a18FdB9c8025"
    },
    "dependencies": {
      "WETH": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "ZERO_EX_EXCHANGE": "0x080bf510fcbf18b91105470639e9561022937712",
      "ZERO_EX_ERC20_PROXY": "0x95e6f48254609a6ee006f7d493c8e5fb97094cef",
      "ZERO_EX_ERC721_PROXY": "0xefc70a1b18c432bdc64b596838b4d138f6bc6cad"
    },
    "state": {
      "network_id": 1,
      "last_deployment_stage": null
    }
  },
  "3-development": {
    "human_friendly_name": "ropsten-development",
    "addresses": {},
    "dependencies": {
      "ZERO_EX_EXCHANGE": "0xbff9493f92a3df4b0429b6d00743b3cfb4c85831",
      "ZERO_EX_ERC20_PROXY": "0xb1408f4c245a23c31b98d2c626777d4c0d766caa",
      "ZERO_EX_ERC721_PROXY": "0xe654aac058bfbf9f83fcaee7793311dd82f6ddb4",
      "WETH": "0xc778417e063141139fce010982780140aa0cd5ab"
    },
    "state": {
      "network_id": 3
    }
  },
  "3-staging": {
    "human_friendly_name": "ropsten-staging",
    "addresses": {
      "Cards": "0xADC559D1afbCBBf427728577F40E7358D96F1209",
      "OpenMinter": "0x36F26280B80e609e347c843E2AE5351Ee4b5f7eD",
      "Forwarder": "0xc79C9c624ea8A3dEdfae0dbf9295Bfb159eE5F3b",
      "Fusing": "0xFfFB48F70Dd10a468957cDD099047e046AdE8670"
    },
    "dependencies": {
      "WETH": "0xc778417e063141139fce010982780140aa0cd5ab",
      "ZERO_EX_EXCHANGE": "0xbff9493f92a3df4b0429b6d00743b3cfb4c85831",
      "ZERO_EX_ERC20_PROXY": "0xb1408f4c245a23c31b98d2c626777d4c0d766caa",
      "ZERO_EX_ERC721_PROXY": "0xe654aac058bfbf9f83fcaee7793311dd82f6ddb4"
    }
  },
  "50-development": {
    "human_friendly_name": "test-rpc-development",
    "addresses": {
      "IM_Beacon": "0x038F9B392Fb9A9676DbAddF78EA5fdbf6C7d9710",
      "IM_Processor": "0x371b13d97f4bF77d724E78c16B7dC74099f40e84",
      "IM_TestVendor": "0x1941ff73d1154774d87521d2D0AaAD5d19C8Df60",
      "IM_Escrow": "0x0D8b0Dd11f5D34Ed41D556Def5f841900d5B1c6B",
      "IM_Escrow_CreditCard": "0x38ef19fDf8E8415f18c307Ed71967e19Aac28Ba1",
      "GU_Cards": "0xF23276778860e420aCFc18ebeEBF7E829b06965c",
      "GU_OpenMinter": "0x609aCc8b356894a937fC58F3411F9528de96EcB1",
      "GU_Fusing": "0xCA9717a4A6e8009B3518648C9f3E7676255471A1",
      "GU_PromoFactory": "0x4586649629F699f9A4B61D0e962DC3c9025Fe488",
      "GU_S1_Vendor": "0xB48E1B16829C7f5Bd62B76cb878A6Bb1c4625D7A",
      "GU_S1_Raffle": "0xc4CC602A7345518d0B7A84049d4Bc8575eBF3398",
      "GU_S1_Sale": "0xe704967449b57b2382B7FA482718748c13C63190",
      "GU_S1_Referral": "0xA4b3e1659c473623287b2cc13b194705cd792525",
      "GU_S1_Epic_Pack": "0x2C530e4Ecc573F11bd72CF5Fdf580d134d25f15F",
      "GU_S1_Rare_Pack": "0x72D5A2213bfE46dF9FbDa08E22f536aC6Ca8907e",
      "GU_S1_Shiny_Pack": "0x2eBb94Cc79D7D0F1195300aAf191d118F53292a8",
      "GU_S1_Legendary_Pack": "0x5315e44798395d4a952530d131249fE00f554565"
    },
    "dependencies": {
      "ZERO_EX_EXCHANGE": "0x48bacb9266a570d521063ef5dd96e61686dbe788",
      "ZERO_EX_ERC20_PROXY": "0x1dc4c1cefef38a777b15aa20260a54e584b16c48",
      "ZERO_EX_ERC721_PROXY": "0x1d7022f5b17d2f8b695918fb48fa1089c9f85401",
      "WETH": "0x0b1ba0af832d7c05fd64161e0db78e85978e8082"
    },
    "state": {
      "network_id": 50,
      "last_deployment_stage": null
    }
  }
}