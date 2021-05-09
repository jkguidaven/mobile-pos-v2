import { Injectable } from '@angular/core';
import { AuthResult } from '../models/auth-result';
import { ServerSettingsService } from './server-settings.service';

import '@capacitor-community/http';
import { Plugins } from '@capacitor/core';
import { GeolocationWatcherService } from './geolocation-watcher.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private serverSettings: ServerSettingsService,
    private geolocationWatcher: GeolocationWatcherService) {
  }

  async validate(token: string): Promise<boolean> {
    if (!token) {
      return false;
    } else {
      try {
        const payload = this.decode(token);
        return payload.exp > new Date().getTime();
      } catch(ex) {
        console.log(ex);
      }

      return true;
    }
  }

  async authenticate(username: string, password: string): Promise<AuthResult> {
    try {
      const location = await this.geolocationWatcher.getCurrent();
      const { Http } = Plugins;
      const result: any = await Http.request({
        method: 'POST',
        url: `${this.serverUrl}/api/user/token`,
        data: {
          username,
          password,
          geolat: location.latitude,
          geolong: location.longitude
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (result.data.access_token) {
        return {
          result: 'success',
          accessToken: result.data.access_token,
          refreshToken: result.data.refresh_token
        };
      } else {
        return {
          result: 'fail',
          message: result.data.message
        };
      }
    } catch (ex) {
      console.error(ex);
      return {
        result: 'fail',
        message: ex.message
      };
    }
  }

  private get serverUrl() {
    return this.serverSettings.get().serverUrl;;
  }

  private decode(token) {
    const parts = token.split('.');
    return JSON.parse(atob(parts[1]));
  }
}
