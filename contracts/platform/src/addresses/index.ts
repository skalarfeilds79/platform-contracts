
import n1 = require('./1.json');
import n3 = require('./3.json');
import n50 = require('./50.json');
import { DeploymentNetwork } from '@imtbl/deployment-utils';

interface PlatformAddresses {
    Randomness?: {
        Beacon: string;
    },
    Escrow?: {
        Protocol: string;
        CreditCard: string;
        Custodian: string;
        Destroyer: string;
    },
    Pay?: {
        Processor: string;
        Signer: string;
        RevenueWallet: string;
        Oracle: string;
    }
    Owner?: string;
}

export const addresses: {[key in keyof typeof DeploymentNetwork]?: PlatformAddresses} = {
    Mainnet: n1,
    Ropsten: n3,
    TestRPC: n50
};
