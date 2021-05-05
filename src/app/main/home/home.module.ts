import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountoModule } from 'angular2-counto';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { NoDbSyncBannerComponent } from './no-db-sync-banner/no-db-sync-banner.component';
import { SettingDbSyncComponent } from '../setting/modals/db-sync.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ExploreContainerComponentModule,
    CountoModule
  ],
  declarations: [HomePage, NoDbSyncBannerComponent, SettingDbSyncComponent]
})
export class HomePageModule {}
