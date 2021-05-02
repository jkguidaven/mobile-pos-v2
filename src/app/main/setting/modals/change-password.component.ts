import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-setting-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class SettingChangePasswordComponent implements OnInit {
  form: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [ Validators.required ]),
    newPassword: new FormControl('', [ Validators.required ]),
  });

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }
}
