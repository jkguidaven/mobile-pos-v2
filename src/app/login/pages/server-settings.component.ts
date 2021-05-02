import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IonNav } from '@ionic/angular';

@Component({
  selector: 'app-server-settings',
  templateUrl: './server-settings.component.html',
  styleUrls: ['./server-settings.component.scss'],
})
export class ServerSettingsComponent implements OnInit {
  serverUrl: FormControl = new FormControl('', [ Validators.required ]);

  constructor(private nav: IonNav) { }

  ngOnInit() {}

  save() {
    this.nav.popToRoot();
  }
}
