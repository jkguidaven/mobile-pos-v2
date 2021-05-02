import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingPageRoutingModule } from './setting-routing.module';

import { SettingPage } from './setting.page';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { SettingChangePasswordComponent } from './modals/change-password.component';
import { SettingProfileComponent } from './modals/profile.component';
import { SettingAboutComponent } from './modals/about.component';
import { SettingDbSyncComponent } from './modals/db-sync.component';
import { CommonComponentModule } from 'src/app/common/common.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SettingPageRoutingModule,
    ExploreContainerComponentModule,
    CommonComponentModule
  ],
  declarations: [SettingPage, SettingChangePasswordComponent, SettingProfileComponent, SettingAboutComponent, SettingDbSyncComponent]
})
export class SettingPageModule {}
