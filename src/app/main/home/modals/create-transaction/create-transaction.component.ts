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
  customerControl: FormControl = new FormControl();
  dateControl: FormControl = new FormControl();

  constructor(private modalController: ModalController) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.modalController.dismiss();
  }

  get hasCustomer() {
    return Boolean(this.customerControl.value);
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
      id: 'create-item-form'
    });

    await modal.present();
  }
}
