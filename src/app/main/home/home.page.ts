import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
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
import { map } from 'rxjs/operators';

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
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController)
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

    if (data && data.cancelTransaction) {
      let loader;
      try {
        loader = await this.loadingController.create({ message: 'Cancelling transaction. please wait.'});
        loader.present();
        await this.transactionQueueService.cancelTransaction(transaction);
      } catch(ex) {
        const toast = this.toastController.create({
          color: 'primary',
          message: 'unable to cancel transaction. please try again later.',
          duration: 2000
        });
        (await toast).present();
      } finally {
        if (loader) {
          loader.dismiss();
        }
      }
    } else if (data) {
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
    const result = await alert.onWillDismiss();
    let loader;
    if (result.role === 'finalize') {
      loader = await this.loadingController.create({
        message: 'Finalizing transactions. please wait..'
      });
      loader.present();
      try {
        await this.transactionQueueService.finalizeTransactions();
      } catch(ex) {
        const toast = this.toastController.create({
          color: 'primary',
          message: 'unable to finalize your transactions. please try again later.',
          duration: 2000
        });
        (await toast).present();
      } finally {
        if (loader) {
          loader.dismiss();
        }
      }
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
