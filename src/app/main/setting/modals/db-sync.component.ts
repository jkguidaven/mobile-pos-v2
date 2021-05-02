import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-setting-db-sync',
  templateUrl: './db-sync.component.html',
  styleUrls: ['./db-sync.component.scss'],
})
export class SettingDbSyncComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }
}
