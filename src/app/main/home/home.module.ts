import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountoModule } from 'angular2-counto';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { NoDbSyncBannerComponent } from './no-db-sync-banner/no-db-sync-banner.component';
import { SettingDbSyncComponent } from '../setting/modals/db-sync.component';
import { CreateTransactionComponent } from './modals/create-transaction/create-transaction.component';
import { CommonComponentModule } from 'src/app/common/common.module';
import { CreateItemFormComponent } from './modals/create-item-form/create-item-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    ExploreContainerComponentModule,
    CountoModule,
    CommonComponentModule
  ],
  declarations: [HomePage, NoDbSyncBannerComponent, SettingDbSyncComponent, CreateTransactionComponent, CreateItemFormComponent]
})
export class HomePageModule {}
