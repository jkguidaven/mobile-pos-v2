import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state';
import * as UserInfoActions from '../store/actions/user-info.action';
import { NativeHttpService } from './native-http.service';
import { ServerSettingsService } from './server-settings.service';

const STORE_KEY = 'USER_INFO';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  constructor(
    private store: Store<AppState>,
    private nativeHttp: NativeHttpService,
    private serverSettings: ServerSettingsService) { }

  load() {
    const info = localStorage.getItem(STORE_KEY)
      ? JSON.parse(localStorage.getItem(STORE_KEY))
      : undefined;

    this.store.dispatch(UserInfoActions.setUserInfo({ info }));
  }

  async fetch() {
    try {
      const serverUrl = this.serverSettings.get().serverUrl;
      const result = await this.nativeHttp.request({
        method: 'GET',
        url: `${serverUrl}/api/user/profile`
      });
      console.log(result);
      if (result.status === 200) {
        localStorage.setItem(STORE_KEY, JSON.stringify(result.data));
        await this.load();
      }
    } catch (ex) {
      console.error(ex);
    }
  }

  clear() {
    localStorage.removeItem(STORE_KEY);
    this.store.dispatch(UserInfoActions.clearUserInfo());
  }
}
