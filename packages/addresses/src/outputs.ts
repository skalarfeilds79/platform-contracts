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
      "IM_Beacon": "0x3Da6832fF6BF2aFA2dAEdA1e148A45c647cfB668",
      "IM_Processor": "0x54102fA75B2446837b2c7472d4b533366eCd2811",
      "IM_TestVendor": "0xa04DAD7dAfd35B7806495dB918F6b04947Caa466",
      "IM_Escrow": "0xCbe4e2B3A3DE4E25265648d24357e0ba1cF65DAA",
      "IM_Escrow_CreditCard": "0x997B07daEB6dA60f1fE3909755221D7F9242000C",
      "GU_Cards": "0x6B2590b071E0672D164e3267dA81a45ED1ca7eeb",
      "GU_OpenMinter": "0xc802aA38684F3B44Ce636304370915d0e6Bd6Fb0",
      "GU_Fusing": "0xd7e2fC3589A408D40240391fEa857A1DC444f7Dd",
      "GU_PromoFactory": "0xf7dD2415e4c140B305f2516DCbbB0613aFcd25C7",
      "GU_S1_Vendor": "0x4532A41E4b1871F3d0D0665A39968104B5388Eb5",
      "GU_S1_Raffle": "0x6975548516e60ce4d005Aa42De1e96DddD9d23eD",
      "GU_S1_Sale": "0x57b7aB09008dD5eda262b160A7b0f0d17c8754B4",
      "GU_S1_Referral": "0x9Ac5A7B338d90A85c6201D2691983Cc37F81AD2d",
      "GU_S1_Epic_Pack": "0x1590311C922a283024f0363777478C6b8c3d8c6c",
      "GU_S1_Rare_Pack": "0x751D5E793577B2fd5dF9356729f8ddabF0800F20",
      "GU_S1_Shiny_Pack": "0xa9a65D631f8c8577f543B64B35909030C84676A2",
      "GU_S1_Legendary_Pack": "0x038C860fd0d598B3DF5577B466c8b0a074867f56"
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