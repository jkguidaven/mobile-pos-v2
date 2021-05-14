import { Transaction } from './transaction';

export interface TransactionList {
  fetching: boolean;
  lastFinalization?: Date;
  total: number;
  transactions: Transaction[];
};
