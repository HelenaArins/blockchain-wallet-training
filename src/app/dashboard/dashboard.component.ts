import { Component, OnInit, Inject } from '@angular/core';
import { BlockchainService, Blockchain } from 'projects/blockchain/src/public_api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public blockchain: Blockchain;

  constructor(
    @Inject(BlockchainService)
    private blockchainService: BlockchainService
  ) {
    this.blockchain = blockchainService.blockchain;
  }

  ngOnInit() {
  }
}
