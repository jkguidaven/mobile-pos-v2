import { Action, createReducer, on } from "@ngrx/store";
import { DBSyncState } from "src/app/models/db-sync";
import * as actions from '../actions/db-sync.action';

export const initialState: DBSyncState = {
  synching: false,
  lastSync: null,
  synchingMessage: 'You have not yet sync your device to the server.'
};

const dbSyncReducer = createReducer(
  initialState,
  on(actions.setLastSync, (state, { lastSync }) => ({
    ...state,
    lastSync
  })),
  on(actions.setSynching, (state, { synching }) => ({
    ...state,
    synching
  })),
  on(actions.setSyncMessage, (state, { synchingMessage }) => ({
    ...state,
    synchingMessage
  }))
);

export default function (state: DBSyncState | undefined, action: Action) {
  return dbSyncReducer(state, action);
};
