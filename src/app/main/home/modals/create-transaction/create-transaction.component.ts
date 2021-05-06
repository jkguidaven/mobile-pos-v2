import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CreateItemFormComponent } from '../create-item-form/create-item-form.component';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {
  customer: any;
  dateControl: FormControl = new FormControl();
  items: any = [];


  constructor(private modalController: ModalController) { }

  ngOnInit(): void {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.dateControl.setValue(`${tomorrow.getFullYear()}-${tomorrow.getMonth()+1}-${tomorrow.getDate()}`);
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
    }
  }
}
