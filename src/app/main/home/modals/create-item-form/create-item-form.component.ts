import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-item-form',
  templateUrl: './create-item-form.component.html',
  styleUrls: ['./create-item-form.component.css']
})
export class CreateItemFormComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.modalController.dismiss({}, '', 'create-item-form');
  }
}
