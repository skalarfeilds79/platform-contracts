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

	let old = '0x6ebeaf8e8e946f0716e6533a6f2cefc83f60e8ab';

	let direct = await deployer.deployAndVerify(DirectMigration, {}, old, cards.contractAddress, 300);

	await cards.startSeason("Genesis", 1, 377, {gasLimit: 1000000});
	await cards.startSeason("Etherbots", 380, 396, {gasLimit: 1000000});
	await cards.startSeason("Promo", 400, 500, {gasLimit: 1000000});

	await cards.addFactory(direct.contractAddress, 1, {gasLimit: 1000000});
	await cards.addFactory(direct.contractAddress, 2,{gasLimit: 1000000});
	await cards.addFactory(direct.contractAddress, 3, {gasLimit: 1000000});

	//let minter = await deployer.deployAndVerify(OpenMinter, {}, cards.contractAddress);

	/*	await cards.startSeason(1, 377, "Genesis");
		await cards.addFactory(minter.contractAddress, 0);
		await cards.unlockTrading(0);
	*/
};

module.exports = {
	deploy
};