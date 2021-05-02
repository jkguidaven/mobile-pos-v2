import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordFieldComponent } from './password-field/password-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [PasswordFieldComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PasswordFieldComponent
  ]
})
export class CommonComponentModule { }
