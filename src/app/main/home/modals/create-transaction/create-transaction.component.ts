import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Transaction } from 'src/app/models/transaction';
import { UserInfo } from 'src/app/models/user-info';
import { GeolocationWatcherService } from 'src/app/services/geolocation-watcher.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { CreateItemFormComponent } from '../create-item-form/create-item-form.component';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {
  @Input() customer: any;
  @Input() dateControl: FormControl = new FormControl();
  @Input() items: any = [];
  @Input() editMode: boolean;
  @Input() readonlyMode: boolean;
  userInfo: UserInfo;


  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private geolocationService: GeolocationWatcherService,
    private userInfoService: UserInfoService) { }

  ngOnInit(): void {
    if (!this.editMode) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.dateControl.setValue(`${tomorrow.getFullYear()}-${tomorrow.getMonth()+1}-${tomorrow.getDate()}`);
    }
    this.userInfo = this.userInfoService.get();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  get hasCustomer() {
    return Boolean(this.customer);
  }

  get hasDate() {
    return Boolean(this.dateControl.value);
  }

  get hasItems() {
    return true;
  }

  get canSubmit() {
    return this.hasCustomer && this.hasDate && this.hasItems;
  }

  async showCreateItemForm() {
    const modal = await this.modalController.create({
      component: CreateItemFormComponent,
      cssClass: 'small-modal',
      id: 'create-item-form',
      componentProps: {
        pricescheme: this.customer.price_scheme
      }
    });

    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.items.push(data);
      this.showCreateItemForm();
    }
  }

  async updateItem(index) {
    const item = this.items[index];
    const modal = await this.modalController.create({
      component: CreateItemFormComponent,
      cssClass: 'small-modal',
      id: 'create-item-form',
      componentProps: {
        pricescheme: this.customer.price_scheme,
        item,
        quantityControl: new FormControl(item.quantity),
        priceControl: new FormControl(item.price),
        updateMode: true
      }
    });

    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.items[index] = data;
    }
  }

  async CancelTransaction() {
    const alert = await this.alertController.create({
      header: 'Cancel Transaction',
      message: 'Are you sure you want to cancel the transaction?',
      buttons: [
        {
          text: 'No',
          role: 'no',
          cssClass: 'cancel-button-alert'
        },
        {
          text: 'Yes',
          role: 'yes',
          cssClass: 'primary'
        }
      ]
    });

    alert.present();

    const result = await alert.onWillDismiss();

    if (result.role === 'yes') {
      this.modalController.dismiss({ cancelTransaction: true });
    }
  }

  deleteItemIndexByIndex(index) {
    this.items.splice(index, 1);
  }

  get totalAmount() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  async save() {
    const booking_date = new Date();
    console.log(this.dateControl.value);
    const rawBookingDate = this.dateControl.value.split('-');
    booking_date.setFullYear(rawBookingDate[0]);
    booking_date.setMonth(rawBookingDate[1]-1);

    if (rawBookingDate[2].indexOf('T') > -1) {
      booking_date.setDate(rawBookingDate[2].split('T')[0]);
    } else {
      booking_date.setDate(rawBookingDate[2]);
    }

    const geolocation = await this.geolocationService.getCurrent();

    const transaction: Transaction = {
      customer: this.customer.id,
      customer_description: this.customer.name,
      booking_date,
      geolocation,
      status: 'queue',
      unsubmittedChange: true,
      items: [ ...this.items ],
      created_date: new Date(),
      agent: this.userInfo.id
    };

    this.modalController.dismiss(transaction);
  }
}
