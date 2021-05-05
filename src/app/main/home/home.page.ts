import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/models/app-state';
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

  constructor(public store: Store<AppState>) {
    this.userInfo$ = store.select('userInfo');
  }

  ngOnInit() {
    this.counto = 0;
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
