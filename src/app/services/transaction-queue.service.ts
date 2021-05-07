import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import Localbase from 'localbase';
import { AppState } from '../models/app-state';
import { Transaction } from '../models/transaction';
import * as actions from '../store/actions/transaction-queue.action';

@Injectable({
  providedIn: 'root'
})
export class TransactionQueueService {
  private db: Localbase;
  constructor(private store: Store<AppState>) {
    this.db = new Localbase('db');
  }

  async load() {
    this.store.dispatch(actions.clearTransaction());
    const data = await this.db.collection('queue').get({ keys: true });

    data.forEach(transaction => {
      this.store.dispatch(actions.pushTransaction({
        transaction: {
          ...transaction.data,
          localId: transaction.key
        }
      }));
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
      return queue.length > 0 ? queue[0] : null;
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
    }
  }
}
