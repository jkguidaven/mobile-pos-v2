import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state';
import * as DBSyncActions from '../store/actions/db-sync.action';
import { NativeHttpService } from './native-http.service';
import Localbase from 'localbase';
import { ServerSettingsService } from './server-settings.service';

const STORE_LAST_SYNC_KEY = 'last_db_sync';

@Injectable({
  providedIn: 'root'
})
export class LookupTableService {
  private db: Localbase = new Localbase('db');
  private cache:any = {};
  constructor(
    private store: Store<AppState>,
    private serverSettings: ServerSettingsService,
    private nativeHttp: NativeHttpService) {
    this.db.config.debug = false;
  }

  async sync() {
    this.store.dispatch(DBSyncActions.setSynching({ synching: true }));
    this.updateSyncMessage('Pulling information from the server...');
    try {
      await this.syncTable('customers', 'customers');
      await this.syncTable('items', 'items');
      await this.syncTable('payment_methods', 'payment_methods', true);
      await this.syncTable('price_schemes', 'price-schemes');

      const now = new Date();
      this.updateSyncMessage(`Successfully sync device to server. your last sync was ${now.toISOString()}`);
      this.store.dispatch(DBSyncActions.setLastSync({ lastSync: now }));
      localStorage.setItem(STORE_LAST_SYNC_KEY, now.toISOString());
    } catch (ex) {
      this.updateSyncMessage('Unable to sync device to server. please try again.');
      console.error(ex);
    }

    this.store.dispatch(DBSyncActions.setSynching({ synching: false }));
  }

  async load() {
    const lastSync = localStorage.getItem(STORE_LAST_SYNC_KEY);
    if (lastSync) {
      this.store.dispatch(DBSyncActions.setLastSync({ lastSync: new Date(lastSync)}));
      this.updateSyncMessage(`your last sync was ${lastSync}`);
      await this.loadCache('customers');
      await this.loadCache('items');
      await this.loadCache('payment_methods');
      await this.loadCache('price_schemes');
    }
  }

  async loadCache(table: string) {
    this.cache[table] = await this.db.collection(table).get()
  }

  searchDataFromCache(name: string, filter: (obj: any) => boolean) {
    return this.cache[name].filter(filter);
  }

  async syncTable(table: string, map: string, pullOnce: boolean = false) {
    this.db.collection(table);
    this.cache[table] = [];
    this.updateSyncMessage(`Pulling ${table} information from server. please wait a moment.`);
    let page = 0;
    let length = 300;

    while(true) {
      const result = await this.nativeHttp.request({
        method: 'GET',
        url: this.getEndPointByTable(table),
        params: {
          page: `${page}`,
          length: `${length}`
        }
      });

      console.log({
        url: this.getEndPointByTable(table),
        page,
        length,
        pulledLength: result.data[map].length,
        lastPage: result.data.last_page,
        total: result.data.total
      });

      if (result.status === 200) {
        result.data[map].forEach(row => {
          this.db.collection(table).add(row);
          this.cache[table].push(row);
        });

        if (page === result.data.last_page || result.data[map].length === 0 || pullOnce) {
          break;
        } else {
          page++;
        }
      } else {
        throw { message: 'Server error pulling info' };
      }
    }
  }

  getEndPointByTable(table: string) {
    return `${this.serverUrl}/api/lookuptable/${table}`;
  }

  get serverUrl(): string {
    return this.serverSettings.get().serverUrl;
  }

  updateSyncMessage(synchingMessage: string) {
    this.store.dispatch(DBSyncActions.setSyncMessage({ synchingMessage }));
  }
}
