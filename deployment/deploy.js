const Cards = require('../build/Cards');
const OpenMinter = require('../build/OpenMinter');
const DirectMigration = require('../build/DirectMigration');

const secrets = require('../secrets.json');

const DeployManager = require('../util/deploy-manager.js');

const deploy = async (network, secret, etherscanApiKey) => {

	const manager = new DeployManager(network, secrets.networks.mainnet.privateKey);

	deployer = manager.getDeployer();

	deployer.setVerifierApiKey(secrets.etherscanApiKey);

	BATCH_SIZE = 1251;

	let cards = await deployer.deployAndVerify(Cards, {}, BATCH_SIZE, "Gods Unchained Cards", "CARD");

	let direct = await deployer.deployAndVerify(DirectMigration, {}, cards.contractAddress);

	await cards.startSeason(0, 381);
	await cards.addFactory(direct.contractAddress, 0);
	

	//let minter = await deployer.deployAndVerify(OpenMinter, {}, cards.contractAddress);

	/*	await cards.startSeason(0, 377);
		await cards.addFactory(minter.contractAddress, 0);
		await cards.unlockTrading(0);
	*/
};

module.exports = {
	deploy
};