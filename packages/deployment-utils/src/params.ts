export enum DeploymentNetwork {
    Mainnet = 1,
    Ropsten = 3,
    Kovan = 42,
    TestRPC = 50,
}
  
export enum DeploymentEnvironment {
    Development = 'development',
    Staging = 'staging',
    Production = 'production',
}

export interface DeploymentParams {
    private_key: string;
    rpc_url: string;
    environment: string;
    network_id: number;
    network_key: string;
}