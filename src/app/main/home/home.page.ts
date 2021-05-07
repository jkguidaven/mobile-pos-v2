import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/models/app-state';
import { DBSyncState } from 'src/app/models/db-sync';
import { TransactionList } from 'src/app/models/transaction-list';
import { UserInfo } from 'src/app/models/user-info';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  dailySales: number = 13105.60;
  counto: number;
  userInfo$: Observable<UserInfo>;
  dbSync$: Observable<DBSyncState>;
  transactionQueue$: Observable<TransactionList>;

  constructor(public store: Store<AppState>) {
    this.userInfo$ = store.select('userInfo');
    this.dbSync$ = store.select('dbSync');
    this.transactionQueue$ = store.select('transactionQueue');
  }

  ngOnInit() {
    this.counto = 0;
    this.transactionQueue$.subscribe((data) => {
      console.log(data);
    })
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
