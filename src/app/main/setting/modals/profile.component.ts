import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-setting-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class SettingProfileComponent implements OnInit {
  @Input() username: string;
  @Input() fullname: string;
  @Input() email: string;
  @Input() phone: string;
  @Input() mobile: string;
  @Input() address: string;
  @Input() gender: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

  get information() {
    return [
      { label: 'Full Name', value: this.fullname },
      { label: 'Username', value: this.username },
      { label: 'Email', value: this.email },
      { label: 'Phone', value: this.phone },
      { label: 'Mobile', value: this.mobile }
    ];
  }
}
