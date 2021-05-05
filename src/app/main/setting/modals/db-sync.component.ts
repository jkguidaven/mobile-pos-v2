import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/models/app-state';
import { DBSyncState } from 'src/app/models/db-sync';
import { LookupTableService } from 'src/app/services/lookup-table.service';

@Component({
  selector: 'app-setting-db-sync',
  templateUrl: './db-sync.component.html',
  styleUrls: ['./db-sync.component.scss'],
})
export class SettingDbSyncComponent implements OnInit {
  state$: Observable<DBSyncState>;

  constructor(private modalController: ModalController,
    public store: Store<AppState>,
    private service: LookupTableService) {
    this.state$ = store.select('dbSync');
  }

  ngOnInit() {
    this.state$.subscribe((state) => {
      console.log({ state });
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  sync() {
    this.service.sync();
  }
}
