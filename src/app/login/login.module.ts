import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { LoginFormComponent } from './pages/form.component';
import { ServerSettingsComponent } from './pages/server-settings.component';
import { CommonComponentModule } from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    CommonComponentModule
  ],
  declarations: [LoginPage, LoginFormComponent, ServerSettingsComponent]
})
export class LoginPageModule {}
