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
      "IM_Beacon": "0x231eDcC0010ECA04796f00b6D6137d66F9FF2818",
      "IM_Processor": "0x929c3e78d330f6E0137007C114d84d081e1688d0",
      "IM_TestVendor": "0xEd46F9396a64d32a4dbB63adC9093b5c6E718382",
      "IM_Escrow": "0xb581A901E74a160865c6D5DeEaa65eE0e4eD15E9",
      "IM_Escrow_CreditCard": "0x90f82293b4c5Fe216dAc09743FE3D227b9b3ADcD",
      "GU_Cards": "0x0C8F0b504b5083a79375995d1e015f2E015445ea",
      "GU_OpenMinter": "0x0fAdB24c3fd228C5b6daD9a5e0E5996527d121DF",
      "GU_Fusing": "0x6c23ccA8C08Fb58C0fEb4650E9829075ff6d22Fd",
      "GU_PromoFactory": "0x1e00315A3aA5a5B1c73372629CDaEC1E89a86e87",
      "GU_S1_Vendor": "0xCE54956B2688c1cb4D88d72c503b755873B48071",
      "GU_S1_Raffle": "0x6ee7F5347120e43c1dB116dd140a3173D5f899E8",
      "GU_S1_Sale": "0xaE24c1dE3a5A71fdF86Ac79A7660469999b79d23",
      "GU_S1_Referral": "0xc4e74EE2aaF897E24bf5f8B3403db7360477b60B",
      "GU_S1_Epic_Pack": "0x786fE8061fBd5ECDe5fdc5fa03b4672F217880e6",
      "GU_S1_Rare_Pack": "0x5840884dd0b3BE49c925E2E3Def4bc65918DbF45",
      "GU_S1_Shiny_Pack": "0x7bc03BddC4D9e8eF2EA1a83Ad14b4e2554f8CAd6",
      "GU_S1_Legendary_Pack": "0xfcA119d9026284d302C114adFB9dDC98F9b1B77b"
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