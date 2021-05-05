import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';

import UserInfoReducer from './store/reducers/user-info.reducer';
import dbSyncReducer from './store/reducers/db-sync.reducer';
import locationReducer from './store/reducers/location.reducer';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AppRoutingModule,
    BrowserModule,
    IonicModule.forRoot(),
    StoreModule.forRoot({
      userInfo: UserInfoReducer,
      dbSync: dbSyncReducer,
      location: locationReducer
    }, {}),
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Geolocation ],
  bootstrap: [AppComponent],
})
export class AppModule {}
