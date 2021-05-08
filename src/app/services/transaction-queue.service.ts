import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import Localbase from 'localbase';
import { AppState } from '../models/app-state';
import { Transaction } from '../models/transaction';
import * as actions from '../store/actions/transaction-queue.action';
import { NativeHttpService } from './native-http.service';
import { ServerSettingsService } from './server-settings.service';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionQueueService {
  private db: Localbase;
  private agentId: number;
  constructor(private store: Store<AppState>,
    private http: NativeHttpService,
    private serverSettings: ServerSettingsService,
    private userInfoService: UserInfoService) {
    this.db = new Localbase('db');
    this.db.config.debug = false;
    this.agentId = this.userInfoService.get().id;
  }

  async load() {
    this.store.dispatch(actions.clearTransaction());
    const data = await this.db.collection('queue').get({ keys: true });

    data.forEach(transaction => {
      const createdDate = transaction.data.created_date;
      const now = new Date();
      if (createdDate &&
        now.getDate() === createdDate.getDate() &&
        now.getMonth() === createdDate.getMonth() &&
        now.getFullYear() === createdDate.getFullYear()) {
        this.store.dispatch(actions.pushTransaction({
          transaction: {
            ...transaction.data,
            localId: transaction.key
          }
        }));
        } else {
          console.log('delete transaction: ' + transaction.key);
          this.db.collection('queue').doc(transaction.key).delete();
        }
    });

    this.eventLoop();
  }

  async addToQueue(transaction: Transaction) {
    const result = await this.db.collection('queue').add(transaction);
    this.store.dispatch(actions.pushTransaction({
      transaction: {
        ...result.data.data,
        localId: result.data.key
      }
    }));
  }

  checkCurrentTransaction(): Promise<any> {
    return this.db.collection('queue').get({ keys: true }).then((queue) => {
      return queue.find(({ data }: { data: Transaction }) => data.unsubmittedChange);
    });
  }

  async removeFromQueue(key: string) {
    this.db.collection('queue').doc(key).delete();
    this.store.dispatch(actions.removeTransaction({ localId: key }));
  }

  async eventLoop() {
    await this.handleQueue();
    setTimeout(() => {
      this.eventLoop();
    }, 1000);
  }

  async handleQueue(): Promise<void> {
    const queue = await this.checkCurrentTransaction();

    if (queue) {
      console.log('detected a pending task.. attempt to push it to the server');
      const { data, key }: { data: Transaction, key: string } = queue;

      try {
        if (data.status === 'queue') {
          const result = await this.submitTransactionToBackend(data);
        } else {
          const result = await this.updateTransactionFromBackend(data);
        }
      } catch (ex) {
        console.error(ex);
      }
    }
  }

  private async submitTransactionToBackend(transaction: Transaction) {
    const result = await this.http.request({
      method: 'POST',
      url: this.getServerUrl(),
      data: {
        customer: transaction.customer,
        customer_description: transaction.customer_description,
        geolocation: {
          latitude: transaction.geolocation.latitude,
          longitude: transaction.geolocation.longitude,
        },
        booking_date: transaction.booking_date,
        items: transaction.items,
        agent: this.agentId
      }
    });

    return result.data;
  }

  private async updateTransactionFromBackend(transaction: Transaction) {
    const result = await this.http.request({
      method: 'POST',
      url: this.getServerUrl() + "/" + transaction.localId,
      data: {
        booking_date: transaction.booking_date,
        items: transaction.items
      }
    });

    return result.data;
  }

  private getServerUrl() {
    return `${this.serverSettings.get().serverUrl}/api/transactions`;
  }
}
