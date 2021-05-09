import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import Localbase from 'localbase';
import { AppState } from '../models/app-state';
import { Transaction } from '../models/transaction';
import { UserInfo } from '../models/user-info';
import * as actions from '../store/actions/transaction-queue.action';
import { NativeHttpService } from './native-http.service';
import { ServerSettingsService } from './server-settings.service';
import { TokenService } from './token.service';
import { UserInfoService } from './user-info.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TransactionQueueService {
  private db: Localbase;
  private agentId: number;
  constructor(private store: Store<AppState>,
    private http: NativeHttpService,
    private serverSettings: ServerSettingsService,
    private userInfoService: UserInfoService,
    private tokenService: TokenService) {
    this.db = new Localbase('db');
    this.db.config.debug = false;
    this.agentId = this.userInfoService.get()?.id;
    this.store.select('userInfo').subscribe((info: UserInfo) => {
      if (info) {
        this.agentId = info.id;
      } else {
        this.agentId = undefined;
      }
    });
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

        // Check if queued item is for current user. if not do not include to app state
        if (transaction.data.agent === this.agentId) {
          this.store.dispatch(actions.pushTransaction({
            transaction: {
              ...transaction.data,
              localId: transaction.key
            }
          }));
        }
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

    if (queue && this.tokenService.get()) {
      console.log('detected a pending task.. attempt to push it to the server');
      const { data, key }: { data: Transaction, key: string } = queue;

      try {
        if (data.status === 'queue') {
          const result = await this.submitTransactionToBackend(data);

          if (result.id) {
            this.db.collection('queue').doc(key).update({
              id: result.id,
              status: result.status,
              unsubmittedChange: false
            });

            this.store.dispatch(actions.updateTransaction({
              localId: key,
              transaction: {
                ...data,
                id: result.id,
                status: result.status,
              }}));
          }
        } else if (data.unsubmittedChange) {
          const result = await this.updateTransactionFromBackend(data);

          if (result.id) {
            this.db.collection('queue').doc(key).update({
              id: result.id,
              status: result.status,
              unsubmittedChange: false
            });

            this.store.dispatch(actions.updateTransaction({
              localId: key,
              transaction: {
                ...data,
                id: result.id,
                status: result.status,
              }}));
          }
        }
      } catch (ex) {
        console.error(ex);
      }
    }
  }

  private async submitTransactionToBackend(transaction: Transaction) {
    const latlongIsZero = transaction.geolocation.latitude === 0 &&
      transaction.geolocation.latitude === 0;

    const result = await this.http.request({
      method: 'POST',
      url: this.getServerUrl(),
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        customer: transaction.customer,
        customer_description: transaction.customer_description,
        geolocation: {
          lat: latlongIsZero ? .1 : transaction.geolocation.latitude,
          long: latlongIsZero ? .1 : transaction.geolocation.longitude,
        },
        booking_date: transaction.booking_date.getTime() / 1000,
        items: transaction.items.map((item) => ({
          item: item.id,
          price: item.price,
          quantity: item.quantity
        })),
        agent: transaction.agent
      }
    });

    return result ? result.data : null;
  }

  private async updateTransactionFromBackend(transaction: Transaction) {
    const latlongIsZero = transaction.geolocation.latitude === 0 &&
      transaction.geolocation.latitude === 0;

    const result = await this.http.request({
      method: 'POST',
      url: this.getServerUrl() + "/" + transaction.id,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        customer: transaction.customer,
        customer_description: transaction.customer_description,
        geolocation: {
          lat: latlongIsZero ? .1 : transaction.geolocation.latitude,
          long: latlongIsZero ? .1 : transaction.geolocation.longitude,
        },
        booking_date: transaction.booking_date.getTime() / 1000,
        items: transaction.items.map((item) => ({
          item: item.id,
          price: item.price,
          quantity: item.quantity
        })),
        agent: transaction.agent
      }
    });

    return result ? result.data : null;
  }

  private getServerUrl() {
    return `${this.serverSettings.get().serverUrl}/api/transactions`;
  }
}
