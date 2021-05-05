import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordFieldComponent } from './password-field/password-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemLineComponent } from './item-line/item-line.component';



@NgModule({
  declarations: [PasswordFieldComponent, ItemLineComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PasswordFieldComponent,
    ItemLineComponent
  ]
})
export class CommonComponentModule { }
