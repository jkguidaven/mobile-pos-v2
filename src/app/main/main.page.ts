import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../models/app-state';
import { DBSyncState } from '../models/db-sync';
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

  constructor(
    private userInfoService: UserInfoService,
    private modalController: ModalController,
    private transactionQueue: TransactionQueueService,
    public store: Store<AppState>) {
      this.dbSync$ = store.select('dbSync');
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
}
