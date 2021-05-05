import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../models/app-state';
import { DBSyncState } from '../models/db-sync';
import { UserInfoService } from '../services/user-info.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  dbSync$: Observable<DBSyncState>;

  constructor(
    private userInfoService: UserInfoService,
    public store: Store<AppState>) {
      this.dbSync$ = store.select('dbSync');
    }

  ngOnInit() {
    this.userInfoService.load();
  }
}
