import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
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
  dailySales = 13105.60;
  counto: number;
  userInfo$: Observable<UserInfo>;
  dbSync$: Observable<DBSyncState>;
  transactionQueue$: Observable<TransactionList>;

  constructor(
    public store: Store<AppState>,
    private transactionQueueService: TransactionQueueService,
    private modalController: ModalController,
    private alertController: AlertController)
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
      await this.transactionQueueService.load(true);
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

  async finalize() {
    const alert = await this.alertController.create({
      header: 'Finalize Transaction',
      message: 'Are you sure you want to finalize the transactions? \n '
        + 'Doing so will disable creation of new transaction for the day.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel-button-alert'
        },
        {
          text: 'Finalize Transactions',
          role: 'finalize',
          cssClass: 'primary'
        }
      ]
    });

    alert.present();
  }
}
