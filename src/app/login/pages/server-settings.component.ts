import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IonNav } from '@ionic/angular';
import { ServerSettingsService } from 'src/app/services/server-settings.service';

@Component({
  selector: 'app-server-settings',
  templateUrl: './server-settings.component.html',
  styleUrls: ['./server-settings.component.scss'],
})
export class ServerSettingsComponent implements OnInit {
  serverUrl: FormControl = new FormControl('', [ Validators.required ]);

  constructor(private nav: IonNav, private service: ServerSettingsService) {
  }

  ngOnInit() {
    this.serverUrl.setValue(this.service.get().serverUrl);
  }

  save() {
    this.service.set({
      serverUrl: this.serverUrl.value
    });

    this.nav.popToRoot();
  }
}
