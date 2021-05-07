import { Injectable } from '@angular/core';
import Localbase from 'localbase';

@Injectable({
  providedIn: 'root'
})
export class TransactionQueueService {
  private db: Localbase;
  constructor() {
    this.db = new Localbase('db');
  }

  addToQueue(task: any) {
    this.db.collection('queue').add(task);
  }

  checkCurrentTransaction(): Promise<any> {
    return this.db.collection('queue').get({ keys: true }).then((queue) => {
      return queue.length > 0 ? queue[0] : null;
    });
  }

  async removeFromQueue(key: string) {
    this.db.collection('queue').doc(key).delete();
  }

  async eventLoop() {
    await this.handleQueue();
    setTimeout(() => {
      console.log('event queue');
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
