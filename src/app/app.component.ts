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

  constructor(@Inject(BlockchainService) private blockchainServie: BlockchainService){
    this.blockchain = this.blockchainServie.blockchain;
  }
  onMine(): boolean{  
    return this.blockchainServie.mine();
  } 

  onSend(){
    const blockIndex = this.blockchainServie.addTransaction(
      new Transaction(20,'eu', 'vc')
    );
    alert('Sua transacao sera incluida no block #' + blockIndex);
  }
}
