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
        const data = previusHash + JSON.stringify(blockData) + nonce.toString;
        const hash = sha256().update(data).digest("hex");

        return hash;
    }

    proofOfWorkNonce(previusHash: string, currentBlockData: BlockData): string {
        let nonce = 0;
        let hash = this.hashBlock(previusHash, currentBlockData, nonce);

        while(hash.substring(0, this.dificulty) !== this.chain[0].hash.substring(0, this.dificulty) ){
            nonce++;
            hash = this.hashBlock(previusHash, currentBlockData, nonce);
        }

        return nonce.toString();
    }
}
