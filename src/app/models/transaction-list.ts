import { Transaction } from "./transaction";

export interface TransactionList {
  total: number;
  transactions: Transaction[];
};
