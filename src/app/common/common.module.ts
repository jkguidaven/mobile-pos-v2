import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordFieldComponent } from './password-field/password-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemLineComponent } from './item-line/item-line.component';
import { CustomerSelectorComponent } from './customer-selector/customer-selector.component';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [PasswordFieldComponent, ItemLineComponent, CustomerSelectorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PasswordFieldComponent,
    ItemLineComponent,
    CustomerSelectorComponent,
    IonicSelectableModule
  ]
})
export class CommonComponentModule { }
