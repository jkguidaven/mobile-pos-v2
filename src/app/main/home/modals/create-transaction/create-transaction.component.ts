import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
