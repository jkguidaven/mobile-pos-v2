import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state';
import * as DBSyncActions from '../store/actions/db-sync.action';

@Injectable({
  providedIn: 'root'
})
export class LookupTableService {
  constructor(private store: Store<AppState>) {}

  sync() {
    console.log('Synching lookup table.');
    this.store.dispatch(DBSyncActions.setSynching({ synching: true }));
    this.store.dispatch(DBSyncActions.setSyncMessage({ synchingMessage: 'Pulling information from the server...' }));
  }

  load() {

  }
}
