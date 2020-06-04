import { asyncForEach } from '@imtbl/utils';
import { Provider } from 'ethers/providers';
import fs from 'fs-extra';
import path from 'path';
import { DeploymentNetwork } from './params';

export class AddressBook {

    readonly root: string;
    private network_id: DeploymentNetwork;

    constructor(root: string, network_id: DeploymentNetwork) {
        this.root = root;
        this.network_id = network_id;
    }

    public setNetworkID(network_id: DeploymentNetwork) {
        this.network_id = network_id;
    } 

    public async set(name: string, address: string) {
        let book = await this.load();
        book[name] = address;
        this.save(book);
    }

    public async remove(name: string) {
        const book = await this.load();
        delete book[name];
        this.save(book);
    }

    public async get(name: string): Promise<string> {
        const book = await this.load();
        return book[name];
    }

    public async clear() {
        let book = await this.load();
        book = null;
        this.save(book);
    }

    public async validate(provider: Provider) {
        const book = await this.load();
        if (!book) {
            return;
        }
        const entries = Object.entries(book);
        await asyncForEach(entries, async ([name, address]: [string, string]) => {
            const code = await provider.getCode(address);
            if (code.length < 3) {
                await this.remove(name);
            }
        });
    }

    private async load(): Promise<any> {
        await fs.ensureFile(this.bookPath());
        let data: any;
        try {
            data = await fs.readJson(this.root, { throws: true });
        } catch (error) {
            data = {};
        }
        return data;
    }

    private bookPath(): string {
        return path.join(this.root, `${this.network_id}.json`);
    }

    private async save(book: any) {
        await fs.outputFile(this.bookPath(), JSON.stringify(book, null, 2));
        await this.createIndexFile();
    }

    private async createIndexFile() {
        // find all networks present in this book
        const files = await fs.readDir(this.bookPath());
        const jsons = files.filter((name: string) => name.includes('.json'));
        if (!jsons || jsons.length == 0) {
            return;
        }
        const networks = jsons.map((name: string) => name.slice(0, name.indexOf('.')));

        // convert those networks into importable form
        const imports = networks.map((network: string) => {
            return `import n${network} = require('./${network}.json'); `;
        });
        const declarations = networks.map((network: string) => {
            return `${network}: n${network}`;
        });
        const template = `
            ${imports.join('\n')}

            export const addresses = {
                ${declarations.join(',\n')}
            };
        `
        const location = path.join(this.root, `index.ts`);
        await fs.outputFile(location, template);
    }

}