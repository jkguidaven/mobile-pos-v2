import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  @Input() transactions: Transaction[];

  constructor() { }

  ngOnInit(): void {
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
}
