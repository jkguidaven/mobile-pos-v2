import { Transaction } from './transaction';

export interface TransactionList {
  fetching: boolean;
  total: number;
  transactions: Transaction[];
};
