import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/models/app-state';
import { DBSyncState } from 'src/app/models/db-sync';
import { Transaction } from 'src/app/models/transaction';
import { TransactionList } from 'src/app/models/transaction-list';
import { UserInfo } from 'src/app/models/user-info';
import { TransactionQueueService } from 'src/app/services/transaction-queue.service';
import { CreateTransactionComponent } from './modals/create-transaction/create-transaction.component';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  dailySales: number = 13105.60;
  counto: number;
  userInfo$: Observable<UserInfo>;
  dbSync$: Observable<DBSyncState>;
  transactionQueue$: Observable<TransactionList>;

  constructor(
    public store: Store<AppState>,
    private transactionQueueService: TransactionQueueService,
    private modalController: ModalController)
  {
    this.userInfo$ = store.select('userInfo');
    this.dbSync$ = store.select('dbSync');
    this.transactionQueue$ = store.select('transactionQueue');
  }

  ngOnInit() {
    this.counto = 0;
  }

  async doRefresh(event) {
    try {
      await this.transactionQueueService.load();
    } catch (ex) {
      console.error(ex);
    }

    event.target.complete();
  }

  async onTransactionSelect(transaction: Transaction) {
    const modal = await this.modalController.create({
      component: CreateTransactionComponent,
      componentProps: {
        editMode: true,
        readonlyMode: [ 'processing', 'approved', 'edited' ].includes(transaction.status),
        customer: {
          id: transaction.customer,
          name: transaction.customer_description
        },
        dateControl: new FormControl(moment(transaction.booking_date).format('YYYY-MM-DD')),
        items: [ ...transaction.items ]
      }
    });
    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.transactionQueueService.pushEditedTransaction({
        ...transaction,
        items: data.items,
        booking_date: data.booking_date,
        unsubmittedChange: true
      });
    }
  }
}
