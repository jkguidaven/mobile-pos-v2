import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TokenService } from 'src/app/services/token.service';
import { SettingDbSyncComponent } from './modals/db-sync.component';
import { SettingProfileComponent } from './modals/profile.component';
import { SettingAboutComponent } from './modals/about.component';
import { SettingChangePasswordComponent } from './modals/change-password.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/app-state';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/models/user-info';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  username = 'James kenneth A. guidaven';
  userInfo$: Observable<UserInfo>;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private modalController: ModalController,
    public store: Store<AppState>) {
      this.userInfo$ = store.select('userInfo');
    }

  ngOnInit() {}

  async showDBSyncPage() {
    const modal = await this.modalController.create({
      component: SettingDbSyncComponent
    });

    await modal.present();
  }

  showProfilePage() {
    const subscription = this.userInfo$.subscribe(async (info) => {
      const names = [];


      const modal = await this.modalController.create({
        component: SettingProfileComponent,
        componentProps: {
          username: info.username,
          fullname: this.mergeName(info.firstname, info.middlename, info.lastname),
          mobile: info.contact.mobile,
          phone: info.contact.phone,
          email: info.contact.email,
          address: info.current_address,
          gender: info.gender
        }
      });

      subscription.unsubscribe();
      await modal.present();
    });
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

  get fullName(): Observable<string> {
    return this.userInfo$.pipe(map(({ firstname, middlename, lastname }) => this.mergeName(firstname, middlename, lastname)));
  }

  mergeName(firstname, middlename, lastname): string {
    const names = [];

      if (firstname) {
        names.push(firstname);
      }

      if (middlename) {
        names.push(middlename);
      }

      if (lastname) {
        names.push(lastname);
      }

      return names.join(' ');
  }

  logout() {
    this.tokenService.clear();
    this.router.navigate([ 'login' ]);
  }
}
