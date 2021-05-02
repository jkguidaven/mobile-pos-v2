import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TokenService } from 'src/app/services/token.service';
import { SettingDbSyncComponent } from './modals/db-sync.component';
import { SettingProfileComponent } from './modals/profile.component';
import { SettingAboutComponent } from './modals/about.component';
import { SettingChangePasswordComponent } from './modals/change-password.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  username: string = "James kenneth A. guidaven";

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private modalController: ModalController) { }

  ngOnInit() {}

  async showDBSyncPage() {
    const modal = await this.modalController.create({
      component: SettingDbSyncComponent
    });

    await modal.present();
  }

  async showProfilePage() {
    const modal = await this.modalController.create({
      component: SettingProfileComponent
    });

    await modal.present();
  }

  async showChangePasswordPage() {
    const modal = await this.modalController.create({
      component: SettingChangePasswordComponent
    });

    await modal.present();
  }

  async showAboutPage() {
    const modal = await this.modalController.create({
      component: SettingAboutComponent
    });

    await modal.present();
  }

  logout() {
    this.tokenService.set(undefined);
    this.router.navigate([ 'login' ]);
  }
}
