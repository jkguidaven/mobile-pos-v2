import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';

const SAMPLE_DUMMY_SIZE = 3;

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  @Input() transactions: Transaction[];
  @Input() fetching: boolean;
  @Output() select: EventEmitter<Transaction> = new EventEmitter<Transaction>();

  dummyList: any = [];

  constructor() {
  }

  ngOnInit(): void {
    for (let i = 0;i < SAMPLE_DUMMY_SIZE;i++) {
      this.dummyList.push({
        first: `${this.getRandomWidth()}%`,
        second: `${this.getRandomWidth()}%`,
        third: `${this.getRandomWidth()}%`
      });
    }
  }

  getTotal(transaction: Transaction): number {
    return transaction.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getStatusColor(transaction: Transaction): string {
    switch(transaction.status) {
      case 'pending':
        return '#7f8c8d';
      case 'approved':
        return '#2ecc71';
      case 'for processing':
      case 'processing':
        return '#3498db';
      case 'rejected':
      case 'deleted':
        return '#e74c3c';
    }
  }

  private getRandomWidth() {
    return Math.floor(Math.random() * 90) + 50;
  }

}
