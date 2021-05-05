import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SettingDbSyncComponent } from '../../setting/modals/db-sync.component';

@Component({
  selector: 'app-no-db-sync-banner',
  templateUrl: './no-db-sync-banner.component.html',
  styleUrls: ['./no-db-sync-banner.component.css']
})
export class NoDbSyncBannerComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit(): void {
  }

  async showSyncDB() {
    const modal = await this.modalController.create({
      component: SettingDbSyncComponent
    });

    modal.present();
  }
}
