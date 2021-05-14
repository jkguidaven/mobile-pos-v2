import { Action, createReducer, on } from '@ngrx/store';
import { TransactionList } from 'src/app/models/transaction-list';
import * as actions from '../actions/transaction-queue.action';

export const initialState: TransactionList = {
  lastFinalization: null,
  fetching: false,
  total: 0,
  transactions: []
};

const transactionListReducer = createReducer(
  initialState,
  on(actions.pushTransaction, (state, { transaction }) => {
    const subtotal = transaction.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    return {
      lastFinalization: state.lastFinalization,
      total: state.total + subtotal,
      fetching: state.fetching,
      transactions: [
        ...state.transactions,
        transaction
      ]
    };
  }),

  on(actions.removeTransaction, (state, { localId }) => {
    const transactions = state.transactions.filter((transaction) => transaction.localId !== localId);
    const total = transactions.reduce((transactionTotal, transaction) => {
      const subtotal = transaction.items.reduce((itemTotal, item) => itemTotal + (item.price * item.quantity), 0);
      return transactionTotal + subtotal;
    }, 0);

    return {
      lastFinalization: state.lastFinalization,
      transactions,
      fetching: state.fetching,
      total
    };
  }),

  on(actions.updateTransaction, (state, { localId, transaction }) => {
    const newTransactions = state.transactions.map((toUpdate) => {
      if (toUpdate.localId === localId) {
        return {
          ...toUpdate,
          ...transaction
        };
      } else {
        return toUpdate;
      }
    });

    const total = state.transactions.reduce((transactionTotal, find) => {
      const subtotal = find.items.reduce((itemTotal, item) => itemTotal + (item.price * item.quantity), 0);
      return transactionTotal + subtotal;
    }, 0);

    return {
      lastFinalization: state.lastFinalization,
      fetching: state.fetching,
      transactions: newTransactions,
      total
    };
  }),

  on(actions.clearTransaction, () => ({
    lastFinalization: null,
    fetching: false,
    total: 0,
    transactions: []
  })),

  on(actions.updateFetching, (state, { fetching }) => ({
    ...state,
    fetching
  })),

  on(actions.setLastFinalization, (state, { lastFinalization }) => ({
    ...state,
    lastFinalization
  }))
);

export default (state: TransactionList | undefined, action: Action) => transactionListReducer(state, action);
