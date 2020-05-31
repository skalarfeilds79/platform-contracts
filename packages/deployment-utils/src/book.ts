import { asyncForEach } from '@imtbl/utils';
import { Provider } from 'ethers/providers';
import fs from 'fs-extra';
import dependencies from './dependencies';
import { DeploymentEnvironment, DeploymentNetwork } from './params';

export class BookData {

    environments: any;

    constructor() {
        this.environments = new Map<string, BookEnvironment>();
    }
}

export class BookEnvironment {
    
    public readonly addresses: any;
    public readonly dependencies: any;

    constructor() {
        this.addresses = {};
        this.dependencies = {};
    }
}

export class AddressBook {

    readonly root: string;
    private env: DeploymentEnvironment;
    private network_id: DeploymentNetwork;

    constructor(root: string, env: DeploymentEnvironment, network_id: DeploymentNetwork) {
        this.root = root;
        this.env = env;
        this.network_id = network_id;
    }

    public use(env: DeploymentEnvironment, network_id: DeploymentNetwork) {
        this.env = env;
        this.network_id = network_id;
    } 

    public async set(name: string, address: string) {
        const book = await this.load();
        const env = book.environments[this.env];
        if (!env) {
            book.environments[this.env] = new BookEnvironment();
        }
        book.environments[this.env].addresses[name] = address;
        this.save(book);
    }

    public async setDependency(name: string, address: string) {
        const book = await this.load();
        const env = book.environments[this.env];
        if (!env) {
            book.environments[this.env] = new BookEnvironment();
        }
        book.environments[this.env].dependencies[name] = address;
        this.save(book);
    }

    public async remove(name: string): Promise<boolean> {
        const book = await this.load();
        const env = book.environments[this.env];
        if (!env) {
            return false;
        }
        env.addresses[name] = null;
        this.save(book);
        return true;
    }

    public async removeDependency(name: string): Promise<boolean> {
        const book = await this.load();
        const env = book.environments[this.env];
        if (!env) {
            return false;
        }
        env.dependencies[name] = null;
        this.save(book);
        return true;
    }

    public async get(name: string): Promise<string> {
        const book = await this.load();
        const env = book.environments[this.env];
        if (!env) {
            return null;
        }
        return env.addresses[name];
    }

    public async getDependency(name: string): Promise<string> {

        // check shared dependencies
        // TODO: this is confusing to me - ask Kerman?
        let dependencyValue = dependencies[name];
        if (dependencyValue) {
            dependencyValue = dependencyValue[this.network_id];
            return dependencyValue;
        }

        const book = await this.load();
        const env = book.environments[this.env];
        if (!env) {
            return null;
        }
        return env.dependencies[name];
    }

    public async clear() {
        let book = await this.load();
        book.environments[this.env] = null;
        this.save(book);
    }

    public async validate(provider: Provider) {
        const book = await this.load();
        if (!book.environments[this.env]) {
            return;
        }
        const entries = Object.entries(book.environments[this.env].addresses);
        await asyncForEach(entries, async ([name, address]: [string, string]) => {
            const code = await provider.getCode(address);
            if (code.length < 3) {
                await this.remove(name);
            }
        });
    }

    private async load(): Promise<BookData> {
        await fs.ensureFile(this.root);
        let data: BookData;
        try {
            data = await fs.readJson(this.root, { throws: true });
        } catch (error) {
            data = new BookData();
        }
        return data;
    }

    private async save(book: BookData) {
        await fs.outputFile(this.root, JSON.stringify(book, null, 2));
    }

}