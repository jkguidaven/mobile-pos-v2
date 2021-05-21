import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../models/app-state';
import { DBSyncState } from '../models/db-sync';
import { TransactionList } from '../models/transaction-list';
import { TransactionQueueService } from '../services/transaction-queue.service';
import { UserInfoService } from '../services/user-info.service';
import { CreateTransactionComponent } from './home/modals/create-transaction/create-transaction.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  dbSync$: Observable<DBSyncState>;
  transactionQueue$: Observable<TransactionList>;

  constructor(
    private userInfoService: UserInfoService,
    private modalController: ModalController,
    private transactionQueue: TransactionQueueService,
    public store: Store<AppState>) {
      this.dbSync$ = store.select('dbSync');
      this.transactionQueue$ = store.select('transactionQueue');
    }

  ngOnInit() {
    this.userInfoService.load();
  }


  async createTransaction() {
    const modal = await this.modalController.create({
      component: CreateTransactionComponent
    });

    modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      this.transactionQueue.addToQueue(data);
    }
  }

  hasFinalizedToday(): Observable<boolean> {
    return this.transactionQueue$.pipe(map((transactionList) => {
      const now = new Date();
      return transactionList.lastFinalization &&
        now.getDate() === transactionList.lastFinalization.getDate() &&
        now.getMonth() === transactionList.lastFinalization.getMonth() &&
        now.getFullYear() === transactionList.lastFinalization.getFullYear();
    }));
  }
}
