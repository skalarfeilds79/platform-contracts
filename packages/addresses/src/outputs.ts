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
      "IM_Beacon": "0x404C55a936f3006B13B020efAaf5771A600Ec04d",
      "IM_Oracle_ETHUSDMock": "0xfD946D47d3dB1e06126d16281Fb3E222A1bA8179",
      "IM_Processor": "0x96EccEa4E124322a6aA0a004da1b91d9a3024C73",
      "IM_TestVendor": "0xd2aa8d362b1CaA68553642831b86Abb3D24B4579",
      "IM_Escrow": "0x434f1EB003B78c0EAbe034313F1aFf47920e0860",
      "IM_Escrow_CreditCard": "0x46c6A737C75cE3a58c6b2De14970E8841c72DcEF",
      "GU_Cards": "0x965D352283a3C8A016b9BBbC9bf6306665d495E7",
      "GU_OpenMinter": "0x588352A251aAC2EC0e868fC13612Fa2edd604f23",
      "GU_Fusing": "0xdc1e388E6548d8E7D7a3Dfe4BFa6acd33EfB03f1",
      "GU_PromoFactory": "0x9E5840E127A2d8ae5dd619FdafBD6E1A2CddeEB9",
      "GU_S1_Vendor": "0x086500820BE8974C48108Bf6C732148ED27b7420",
      "GU_S1_Raffle": "0xd3771D58F901C5d50b093501f38659016863Eb6C",
      "GU_S1_Sale": "0x786DB8abB27721811aA3F6C1c99dB7A04854a4cd",
      "GU_S1_Referral": "0x3666FD6449699337320675B96A0BC75e2c21489b",
      "GU_S1_Epic_Pack": "0xB44e19c3C2D3B17A37c266F67fB38E2d7cD88Ff8",
      "GU_S1_Rare_Pack": "0x55D8C9bAe15019bFB02b52CB3ceEd05b783ea275",
      "GU_S1_Shiny_Pack": "0x3Da6832fF6BF2aFA2dAEdA1e148A45c647cfB668",
      "GU_S1_Legendary_Pack": "0x54102fA75B2446837b2c7472d4b533366eCd2811"
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