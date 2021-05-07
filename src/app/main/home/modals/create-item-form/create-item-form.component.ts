import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-item-form',
  templateUrl: './create-item-form.component.html',
  styleUrls: ['./create-item-form.component.css']
})
export class CreateItemFormComponent implements OnInit {
  @Input() pricescheme: any;

  @Input() item: any;
  @Input() quantityControl: FormControl = new FormControl(1);
  @Input() priceControl: FormControl = new FormControl(0);
  @Input() updateMode: boolean;

  constructor(private modalController: ModalController) { }

  ngOnInit(): void {
  }

  get hasItem() {
    return Boolean(this.item && this.quantityControl.value > 0);
  }

  dismiss() {
    this.modalController.dismiss(null, '', 'create-item-form');
  }

  onItemChange() {
    if (this.pricescheme) {
      const itemMap = this.pricescheme.item.find((item) => item.id === this.item.id);
      if (itemMap) {
        this.priceControl.setValue(itemMap.price);
      }
    }
  }

  addItem() {
    this.modalController.dismiss({
      ...this.item,
      price: this.priceControl.value,
      quantity: this.quantityControl.value
    }, '', 'create-item-form');
  }
}
