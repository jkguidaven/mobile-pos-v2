import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'ion-password',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class PasswordFieldComponent implements OnInit {
  @Input() label = 'Password';
  @Input() controlName: string;
  @Input() color: string;

  hideMode: boolean;

  constructor() { }

  ngOnInit() {}


  get inputType() {
    return this.hideMode ? 'input' : 'password';
  }

  get inputIcon() {
    return this.hideMode ? 'eye-outline' : 'eye-off-outline';
  }
}
