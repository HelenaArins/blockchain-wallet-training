 import { Block } from './block';
import { Transaction } from './transaction';

export class Blockchain {
    public chain: Block[];
    public pedingTransactions: Transaction[] = [];
    public nodeUrl: string;
    public networkNodes: string[] = [];

    constructor(GENESIS_BLOCK: Block){
        this.chain = [GENESIS_BLOCK];
        this.nodeUrl = uuid();
    }
}
