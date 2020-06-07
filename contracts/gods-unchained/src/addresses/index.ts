

import n1 = require('./1.json');
import n3 = require('./3.json');
import n50 = require('./50.json');
import { DeploymentNetwork } from '@imtbl/deployment-utils';

interface GUAddresses {
    S1?: {
        RarePack: string;
        EpicPack: string;
        LegendaryPack: string;
        ShinyPack: string;
        RareChest: string;
        LegendaryChest: string;
        Raffle: string;
        Sale: string;
        Cap: string;
        Referral: string;
    },
    Migration?: {
        Etherbots: string;
        Chimera: string
    },
    Legacy?: {
        Cards: string;
    },
    Flux?: {
        Fusing: string;
        BlacklistFusing: string;
        Forge: string;
    },
    Owner?: string;
    Cards: string;
}

export const addresses: {[key in keyof typeof DeploymentNetwork]?: GUAddresses} = {
    Mainnet: n1,
    Ropsten: n3,
    TestRPC: n50,
};
