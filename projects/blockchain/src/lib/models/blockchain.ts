import { Block } from './block';
import { Transaction } from './transaction';
import { v4 as uuid } from 'uuid';
import { Hash } from 'crypto';
import { BlockData } from './block-data';
import { JsonPipe } from '@angular/common';
import { sha256 } from 'hash.js';

export class Blockchain {
    public chain: Block[];
    public pedingTransactions: Transaction[] = [];
    public nodeUrl: string;
    public networkNodes: string[] = [];
    private dificulty: number;

    constructor(GENESIS_BLOCK: Block, dificulty = 2){
        this.chain = [GENESIS_BLOCK];
        this.nodeUrl = uuid();
        this.dificulty = dificulty;
    }

    newBlock(nonce: string | number, previusHash: string, hash: string): Block {
        const newBlock = new Block(
            this.chain.length,
            Date.now(),
            this.pedingTransactions,
            nonce.toString(),
            hash,
            previusHash        
        )
        this.pedingTransactions = [];
        this.chain.push(newBlock);

        return newBlock;
    }

    getLatesBlock():Block{
        return this.chain[this.chain.length -1];
    }

    hashBlock(previusHash: string, blockData: BlockData, nonce: string | number): string {
        const data = previusHash + JSON.stringify(blockData) + nonce.toString();
        const hash = sha256().update(data).digest("hex");

        return hash;
    }

    proofOfWorkNonce(previousHash: string, currentBlockData: BlockData): string {
        let nonce = 0;
        let hash = this.hashBlock(previousHash, currentBlockData, nonce);

        while(hash.substr(0, this.dificulty) !== this.chain[0].hash.substr(0, this.difi     culty) ){
            nonce++;
            hash = this.hashBlock(previousHash, currentBlockData, nonce);
        }
        return nonce.toString();
    }

    validateBlock(block: Block, previusBlock: Block): boolean {
        if(block.previousHash !== previusBlock.hash)
            return false;

        const validateBlockHash = this.hashBlock(block.previousHash, new BlockData(block), block.nonce) 

        if(validateBlockHash !== block.hash){
            return false;
        }
        
        return block.hash.substr(0, this.dificulty) === this.chain[0].hash.substr(0, this.dificulty);
    }

    isValidChain(Blockchain: Blockchain): boolean{
        const testChain = Blockchain.chain;
        const invalidBlocks = testChain.filter((block,index) => {
            const isSameHash = block.hash === this.chain[index].hash;
            const isSamePreviousHash = block.previousHash === this.chain[index].previousHash;
            return !isSameHash || !isSamePreviousHash || (index > 0 && !this.validateBlock(block, testChain[index-1]));
        });
        return invalidBlocks.length === 0;
    }

    addTransactionToPending(transaction: Transaction): number {
        this.pedingTransactions.push(transaction);
        return this.getLatesBlock().index + 1;
    }

    newTransaction(amount: number, sender: string, recipient: string): Transaction{
        const transaction = new Transaction(amount, sender, recipient);
        return transaction;
    }
}
