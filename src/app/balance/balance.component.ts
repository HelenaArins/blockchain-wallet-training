import { Component, OnInit, Input } from '@angular/core';
import { Block, Transaction } from 'projects/blockchain/src/public_api';
import { totalmem } from 'os';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  @Input() chain: Block[];

  public owner: string;
  public value = 0;
  public balance: {owner: string, value: number};
  public count =0;

  constructor() { }

  ngOnInit() {
    this.balance = {owner: this.owner, value: this.value};
  }

  getBalance(owner: string){
    if(!owner || owner === ''){
      this.value = 0;
      return false;
    }
    this.owner = owner;
    const initial = new Transaction(0, 'system', owner);

    this.value = 0; 
    for (const block of this.chain) {
      for (const trans of block.transactions) {     
        if(trans.recipient === owner){
          this.value = Number(trans.amount) + Number(this.value);
          console.log("1 if | trans.amount "+ trans.amount +" | this.value "+this.value);
          this.count++;
        }
        else if(trans.sender === owner){
          this.value = Number(trans.amount) + Number(this.value);
          this.count++;
        }
        else if(trans.sender !== owner && trans.recipient !== owner && this.count === 0) {
            this.value = 0;   
        }
      }
    }
  }
}
