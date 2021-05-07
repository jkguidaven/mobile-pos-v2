import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordFieldComponent } from './password-field/password-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemLineComponent } from './item-line/item-line.component';
import { CustomerSelectorComponent } from './customer-selector/customer-selector.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { AddItemLineComponent } from './add-item-line/add-item-line.component';
import { ItemSelectorComponent } from './item-selector/item-selector.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

@NgModule({
  declarations: [
    PasswordFieldComponent,
    ItemLineComponent,
    CustomerSelectorComponent,
    AddItemLineComponent,
    ItemSelectorComponent,
    TransactionListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PasswordFieldComponent,
    ItemLineComponent,
    CustomerSelectorComponent,
    IonicSelectableModule,
    AddItemLineComponent,
    ItemSelectorComponent,
    TransactionListComponent
  ]
})
export class CommonComponentModule { }
