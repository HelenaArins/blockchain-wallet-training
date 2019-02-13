import { Injectable, inject } from '@angular/core';
import { Blockchain } from './models/blockchain';
import { Block } from './models/block';
import { Transaction } from './models/transaction';
import { BlockData } from './models/block-data';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  public blockchain: Blockchain;

  constructor(@inject('GENESIS_BLOCK') GENESIS_BLOCK: Block) { 
    this.blockchain = new Blockchain(GENESIS_BLOCK );
  }
  list(): Block[]{
    return this.blockchain.chain;
  }
  addTransaction(transaction: Transaction):number {
    return this.blockchain.addTransactionToPending(transaction);
  }
  mine():boolean{
    const latesBlock = this.blockchain.getLatesBlock();
    const previousHash = latesBlock.previousHash;
    const currentBlockData = new BlockData({
      transactions: this.blockchain.pedingTransactions, 
      index: latesBlock.index + 1
    } as Block);
    const nonce = this.blockchain.proofOfWorkNonce(previousHash, currentBlockData);
    const hash = this.blockchain.hashBlock(previousHash, currentBlockData, nonce);
    const block = this.blockchain.newBlock(nonce, previousHash, hash);
    
    return this.blockchain.validateBlock(block, latesBlock);
  }
}
