import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Transaction } from 'src/app/models/transaction';
import { UserInfo } from 'src/app/models/user-info';
import { GeolocationWatcherService } from 'src/app/services/geolocation-watcher.service';
import { LookupTableService } from 'src/app/services/lookup-table.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { CreateItemFormComponent } from '../create-item-form/create-item-form.component';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss'],
})
export class CreateTransactionComponent implements OnInit {
  @Input() customer: any;
  @Input() dateControl: FormControl = new FormControl();
  @Input() pmethodControl: FormControl = new FormControl();
  @Input() ptermControl: FormControl = new FormControl();
  @Input() items: any = [];
  @Input() editMode: boolean;
  @Input() readonlyMode: boolean;
  paymentTerms: any = [];
  paymentMethods: any = [];
  userInfo: UserInfo;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private geolocationService: GeolocationWatcherService,
    private userInfoService: UserInfoService,
    private lookupTableService: LookupTableService
  ) {}

  ngOnInit(): void {
    this.initSelectComponents();
    if (!this.editMode) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.dateControl.setValue(
        `${tomorrow.getFullYear()}-${
          tomorrow.getMonth() + 1
        }-${tomorrow.getDate()}`
      );
    }
    this.userInfo = this.userInfoService.get();
  }

  async initSelectComponents() {
    const methods = await this.lookupTableService.searchDataFromCache(
      'payment_methods',
      () => true
    );

    const terms = await this.lookupTableService.searchDataFromCache(
      'payment_terms',
      () => true
    );

    this.paymentMethods = methods ?? [];
    this.paymentTerms = terms ?? [];
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

  get hasPaymentMehtod() {
    return Boolean(this.pmethodControl.value);
  }

  get hasPaymentTerm() {
    return Boolean(this.ptermControl.value);
  }

  get cashOnDeliveryModeOnly() {
    if (this.customer) {
      const term = this.paymentTerms.find(
        (term) => term.id === this.customer.payment_term
      );
      return (
        term && term.description.trim().toLowerCase() === 'cash on delivery'
      );
    }

    return false;
  }

  get canSubmit() {
    return (
      this.hasCustomer &&
      this.hasDate &&
      this.hasItems &&
      this.hasPaymentMehtod &&
      this.hasPaymentTerm
    );
  }

  onCustomerSelected(customer: any) {
    this.ptermControl.setValue(customer.payment_term);

    const term = this.paymentTerms.find(
      (term) => term.id === customer.payment_term
    );

    if (term && term.description.trim().toLowerCase() === 'cash on delivery') {
      const method = this.paymentMethods.find(
        (method) => method.description.trim().toLowerCase() === 'cash'
      );

      if (method) {
        this.pmethodControl.setValue(method.id);
      }
    }
  }

  async showCreateItemForm() {
    const modal = await this.modalController.create({
      component: CreateItemFormComponent,
      cssClass: 'small-modal',
      id: 'create-item-form',
      componentProps: {
        pricescheme: this.customer.price_scheme,
      },
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
        updateMode: true,
      },
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
          cssClass: 'cancel-button-alert',
        },
        {
          text: 'Yes',
          role: 'yes',
          cssClass: 'primary',
        },
      ],
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
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  async save() {
    const booking_date = new Date(this.dateControl.value);
    console.log(booking_date);

    const geolocation = await this.geolocationService.getCurrent();

    const transaction: Transaction = {
      customer: this.customer.id,
      customer_description: this.customer.name,
      payment_method: this.pmethodControl.value,
      payment_term: this.ptermControl.value,
      booking_date,
      geolocation,
      status: 'queue',
      unsubmittedChange: true,
      items: [...this.items],
      created_date: new Date(),
      agent: this.userInfo.id,
    };

    this.modalController.dismiss(transaction);
  }
}
