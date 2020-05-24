import fs from 'fs-extra';
import { Provider } from 'ethers/providers';
import { asyncForEach } from '@imtbl/utils';

export class BookData {

    environments: Map<string, BookEnvironment>;

    constructor() {
        this.environments = new Map<string, BookEnvironment>();
    }
}

export class BookEnvironment {
    
    public readonly addresses: Map<string, string>;
    public readonly dependencies: Map<string, string>;

    constructor() {
        this.addresses = new Map<string, string>();
        this.dependencies = new Map<string, string>();
    }
}

export class AddressBook {

    readonly root: string;
    private env: string;

    constructor(root: string, env: string) {
        this.root = root;
        this.env = env;
    }

    public use(environment: string) {
        this.env = environment;
    } 

    public async set(name: string, address: string) {
        const book = await this.load();
        if (!book.hasOwnProperty(this.env)) {
            book.environments[this.env] = { addresses: {}, state: {} };
        }
        book.environments[this.env].addresses[name] = address;
    }

    public async setDependency(name: string, address: string) {
        const book = await this.load();
        if (!book.hasOwnProperty(this.env)) {
            book.environments[this.env] = new BookEnvironment();
        }
        book.environments[this.env].dependencies[name] = address;
    }

    public async remove(name: string): Promise<boolean> {
        const book = await this.load();
        if (!book.hasOwnProperty(this.env)) {
            return false;
        }
        book.environments[this.env].addresses[name] = null;
        this.save(book);
        return true;
    }

    public async removeDependency(name: string): Promise<boolean> {
        const book = await this.load();
        if (!book.hasOwnProperty(this.env)) {
            return false;
        }
        book.environments[this.env].dependencies[name] = null;
        this.save(book);
        return true;
    }

    public async get(name: string): Promise<string> {
        const book = await this.load();
        if (!book.hasOwnProperty(this.env)) {
            return null;
        }
        return book.environments[this.env].addresses[name];
    }

    public async getDependency(name: string): Promise<string> {
        const book = await this.load();
        if (!book.hasOwnProperty(this.env)) {
            return null;
        }
        return book.environments[this.env].dependencies[name];
    }

    public async clear(env?: string) {
        let book = await this.load();
        if (env) {
            book.environments[env] = null;
        } else {
            book = null;
        }
        this.save(book);
    }

    public async validate(provider: Provider) {
        const book = await this.load();
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
        try {
            return await fs.readJson(this.root, { throws: true });
        } catch (error) {
            return new BookData();
        }
    }

    private async save(book: BookData) {
        await fs.outputFile(this.root, JSON.stringify(book, null, 2));
    }

}