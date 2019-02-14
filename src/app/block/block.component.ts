import { Component, OnInit, Input } from '@angular/core';
import { Block } from 'projects/blockchain/src/public_api';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {

  @Input() private block: Block;
  constructor() { }

  ngOnInit() {
  }

}