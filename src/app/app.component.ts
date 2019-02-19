import { Component, Inject } from '@angular/core';
import { BlockchainService, Blockchain, Transaction } from 'projects/blockchain/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blockchain-wallet-training';
  public blockchain: Blockchain;
  public isValued: boolean;

  constructor(@Inject(BlockchainService) private blockchainServie: BlockchainService){
    this.blockchain = this.blockchainServie.blockchain;
    this.isValued = this.blockchain.isValidChain(this.blockchain);
  }
  onMine(): boolean{  
    return this.blockchainServie.mine();
  } 
}
