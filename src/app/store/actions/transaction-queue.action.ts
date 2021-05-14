import { createAction, props } from '@ngrx/store';
import { Transaction } from 'src/app/models/transaction';

export const pushTransaction = createAction('[Transaction queue] push transaction', props<{ transaction: Transaction }>());
export const removeTransaction = createAction('[Transaction queue] remove transaction', props<{ localId: string }>());
export const updateTransaction = createAction('[Transaction queue] update transaction',
  props<{ localId: string; transaction: Transaction }>());
export const updateFetching = createAction('[Transaction queue] update fetching', props<{ fetching: boolean }>());
export const clearTransaction = createAction('[Transaction queue] clear transaction');
export const setLastFinalization = createAction('[Transaction queue] set last finalized date', props<{ lastFinalization: Date }>());
