import { keccak256 } from 'ethers/utils';
import { ethers } from 'ethers';
import { DeploymentEnvironment } from '@imtbl/deployment-utils';

interface Product {
  SKU: string;
  Price: number;
}

interface ERC20 {
  TokenName: string;
  TokenSymbol: string;
}

interface Chest extends Product, ERC20 {
  Cap: number;
}

export interface GUConstants {
  S1: {
    Pack: {
      Rare: Product,
      Epic: Product,
      Legendary: Product,
      Shiny: Product
    },
    Chest: {
      Rare: Chest,
      Legendary: Chest
    },
    Cap: number;
    Referral: {
      ReferrerShare: number;
      VaultShare: number;
    },
    Raffle: ERC20
    LowProto: number;
    HighProto: number;
  },
  MaxMint: number
}

const defaults = {
  S1: {
    Pack: {
      Rare: {
        SKU: skuify('s1.pack.rare'),
        Price: 249
      },
      Epic: {
        SKU: skuify('s1.pack.epic'),
        Price: 699
      },
      Legendary: {
        SKU: skuify('s1.pack.legendary'),
        Price: 2499
      },
      Shiny: {
        SKU: skuify('s1.pack.shiny'),
        Price: 14999
      }
    },
    Chest: {
      Rare: {
        SKU: skuify('s1.chest.rare'),
        Price: 1799,
        Cap: 8000,
        TokenName: 'GU:S1: Rare Chest',
        TokenSymbol: 'GU:S1:RC'
      },
      Legendary: {
        SKU: skuify('s1.chest.legendary'),
        Price: 17999,
        Cap: 3250,
        TokenName: 'GU:S1: Legendary Chest',
        TokenSymbol: 'GU:S1:LC'
      }
    },
    Cap: 4 * 1000000 * 100,
    Referral: {
      ReferrerShare: 10,
      VaultShare: 90,
    },
    Raffle: {
      TokenName: 'GU:S1: Raffle Ticket',
      TokenSymbol: 'GU:S1:RT'
    },
    LowProto: 800,
    HighProto: 999,
  }
}

export const constants: {[key in keyof typeof DeploymentEnvironment]?: GUConstants} = {
  Production: {
    MaxMint: 50,
    ...defaults
  },
  Staging: {
    MaxMint: 50,
    ...defaults
  },
  Development: {
    MaxMint: 5,
    ...defaults
  }
};

function skuify(key: string): string {
  return keccak256(ethers.utils.formatBytes32String(key));
}