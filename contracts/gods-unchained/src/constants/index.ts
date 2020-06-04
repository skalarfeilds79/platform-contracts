import { keccak256 } from 'ethers/utils';
import { ethers } from 'ethers';

export const GU_S1_LOW_PROTO = 800;
export const GU_S1_HIGH_PROTO = 999;

export const GU_S1_REFERRER_SHARE = 10;
export const GU_S1_REFERRED_VAULT_SHARE = 90;

export const GU_S1_CAP = 4 * 1000000 * 100; // $4m USD

export const GU_S1_MAX_MINT = 50;

export const GU_S1_RARE_PACK_PRICE = 249;
export const GU_S1_EPIC_PACK_PRICE = 699;
export const GU_S1_LEGENDARY_PACK_PRICE = 2499;
export const GU_S1_SHINY_PACK_PRICE = 14999;

export const GU_S1_RARE_CHEST_CAP = 8000;
export const GU_S1_RARE_CHEST_PRICE = 1799;
export const GU_S1_RARE_CHEST_TOKEN_NAME = 'GU:S1: Rare Chest';
export const GU_S1_RARE_CHEST_TOKEN_SYMBOL = 'GU:S1:RC';

export const GU_S1_LEGENDARY_CHEST_CAP = 3250;
export const GU_S1_LEGENDARY_CHEST_PRICE = 17999;
export const GU_S1_LEGENDARY_CHEST_TOKEN_NAME = 'GU:S1: Legendary Chest';
export const GU_S1_LEGENDARY_CHEST_TOKEN_SYMBOL = 'GU:S1:LC';

export const GU_S1_RAFFLE_TOKEN_NAME = 'GU:S1: Raffle Ticket';
export const GU_S1_RAFFLE_TOKEN_SYMBOL = 'GU:S1:RT';

export const GU_S1_EPIC_PACK_SKU = skuify('s1.pack.epic');
export const GU_S1_RARE_PACK_SKU = skuify('s1.pack.rare');
export const GU_S1_SHINY_PACK_SKU = skuify('s1.pack.shiny');
export const GU_S1_LEGENDARY_PACK_SKU = skuify('s1.pack.legendary');

export const GU_S1_RARE_CHEST_SKU = skuify('s1.chest.rare');
export const GU_S1_LEGENDARY_CHEST_SKU = skuify('s1.chest.legendary');

function skuify(key: string): string {
  return keccak256(ethers.utils.formatBytes32String(key));
}

export const WETH = {
  1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  3: '0xc778417e063141139fce010982780140aa0cd5ab',
  50: '0x0b1ba0af832d7c05fd64161e0db78e85978e8082',
};

export const ZERO_EX_EXCHANGE = {
  1: '0x080bf510fcbf18b91105470639e9561022937712',
  3: '0xbff9493f92a3df4b0429b6d00743b3cfb4c85831',
  50: '0x48bacb9266a570d521063ef5dd96e61686dbe788',
};

export const ZERO_EX_ERC20_PROXY = {
  1: '0x95e6f48254609a6ee006f7d493c8e5fb97094cef',
  3: '0xb1408f4c245a23c31b98d2c626777d4c0d766caa',
  50: '0x1dc4c1cefef38a777b15aa20260a54e584b16c48',
};
export const ZERO_EX_ERC721_PROXY = {
  1: '0xefc70a1b18c432bdc64b596838b4d138f6bc6cad',
  3: '0xe654aac058bfbf9f83fcaee7793311dd82f6ddb4',
  50: '0x1d7022f5b17d2f8b695918fb48fa1089c9f85401',
};
export const GU_FUSING_MINTER = {
  1: '',
  3: '0xA80E99f59cd0474F76754Ed5498F2Ef6D6f09951',
  50: '0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb',
};
export const INTENDED_OWNER = {
  1: '0xed824e513aff2545af0b6bb11ec2c503560e7672',
  3: '',
  50: '',
};