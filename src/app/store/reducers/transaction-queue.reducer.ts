import { Action, createReducer, on } from "@ngrx/store";
import { TransactionList } from "src/app/models/transaction-list";
import * as actions from '../actions/transaction-queue.action';

export const initialState: TransactionList = {
  total: 0,
  transactions: []
};

const transactionListReducer = createReducer(
  initialState,
  on(actions.pushTransaction, (state, { transaction }) => {
    const subtotal = transaction.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    return {
      total: state.total + subtotal,
      transactions: [
        ...state.transactions,
        transaction
      ]
    };
  }),

  on(actions.removeTransaction, (state, { localId }) => {
    const transactions = state.transactions.filter((transaction) => transaction.localId !== localId);
    const total = transactions.reduce((total, transaction) => {
      const subtotal = transaction.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
      return total + subtotal;
    }, 0);

    return {
      transactions,
      total
    }
  }),

  on(actions.updateTransaction, (state, { localId, transaction }) => {
    const index = state.transactions.findIndex((transaction) => {
      return transaction.localId === localId
    });

    state.transactions[index] = {
      ...state.transactions[index],
      ...transaction
    }

    const total = state.transactions.reduce((total, transaction) => {
      const subtotal = transaction.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
      return total + subtotal;
    }, 0);

    return {
      transactions: [ ...state.transactions ],
      total
    }
  }),

  on(actions.clearTransaction, () => ({ total: 0, transactions: [] }))
);

export default function (state: TransactionList | undefined, action: Action) {
  return transactionListReducer(state, action);
};
