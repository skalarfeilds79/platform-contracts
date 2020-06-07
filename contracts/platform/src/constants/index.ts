
import { DeploymentEnvironment } from '@imtbl/deployment-utils';

export interface PlatformEnvironmentConstants {
    Escrow: {
        DestructionDelay: number;
        ReleaseDelay: number;
        Capacity: number;
    }
}

export const constants: {[key in keyof typeof DeploymentEnvironment]?: PlatformEnvironmentConstants} = {
    Production: {
        Escrow: {
            DestructionDelay: 640800,
            ReleaseDelay: 640800,
            Capacity: 250,
        }
    },
    Staging: {
        Escrow: {
            DestructionDelay: 60,
            ReleaseDelay: 60,
            Capacity: 250,
        }
    },
    Development: {
        Escrow: {
            DestructionDelay: 60,
            ReleaseDelay: 60,
            Capacity: 250,
        }
    },
}