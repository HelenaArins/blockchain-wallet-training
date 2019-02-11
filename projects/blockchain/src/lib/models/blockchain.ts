import { Block } from './block';
import { Transaction } from './transaction';

export class Blockchain {
    public chain: Block[];
    public pedingTransactions: Transaction[] = [];
    public nodeUrl: string;
    public networkNodes: string[] = [];
}
