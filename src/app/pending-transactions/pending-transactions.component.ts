import { Component, OnInit, Inject } from '@angular/core';
import { BlockchainService, Blockchain, Transaction } from 'projects/blockchain/src/public_api';

@Component({
  selector: 'app-pending-transactions',
  templateUrl: './pending-transactions.component.html',
  styleUrls: ['./pending-transactions.component.css']
})
export class PendingTransactionsComponent implements OnInit {

    // title = 'blockchain-wallet-training';
    public blockchain: Blockchain;
    // public isValued: boolean;
  
    constructor(@Inject(BlockchainService) private blockchainServie: BlockchainService){
      this.blockchain = this.blockchainServie.blockchain;
      // this.isValued = this.blockchain.isValidChain(this.blockchain);
    }

  ngOnInit() {
  }

}
