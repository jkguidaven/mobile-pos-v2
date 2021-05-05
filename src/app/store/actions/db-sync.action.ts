import { createAction, props } from '@ngrx/store';

export const setSynching = createAction('[DB Sync] set Syncing', props<{ synching: boolean }>());
export const setLastSync = createAction('[DB Sync] set Last Sync', props<{ lastSync: Date }>());
export const setSyncMessage = createAction('[DB Sync] set Message', props<{ synchingMessage: string }>());
