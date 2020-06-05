
import { DeploymentEnvironment } from '@imtbl/deployment-utils';

interface PlatformEnvironmentConstants {
    IM_ESCROW_DESTRUCTION_DELAY: number;
    IM_ESCROW_RELEASE_DELAY: number;
    IM_ESCROW_CAPACITY: number;
}

export const constants: {[key in keyof typeof DeploymentEnvironment]?: PlatformEnvironmentConstants} = {
    Production: {
        IM_ESCROW_DESTRUCTION_DELAY: 640800,
        IM_ESCROW_RELEASE_DELAY: 640800,
        IM_ESCROW_CAPACITY: 250,
    },
    Staging: {
        IM_ESCROW_DESTRUCTION_DELAY: 60,
        IM_ESCROW_RELEASE_DELAY: 60,
        IM_ESCROW_CAPACITY: 250,
    },
    Development: {
        IM_ESCROW_DESTRUCTION_DELAY: 60,
        IM_ESCROW_RELEASE_DELAY: 60,
        IM_ESCROW_CAPACITY: 250,
    }
}