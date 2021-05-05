import { Injectable } from '@angular/core';
import { AuthResult } from '../models/auth-result';
import { ServerSettingsService } from './server-settings.service';

import '@capacitor-community/http';
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private serverSettings: ServerSettingsService) {
  }

  async validate(token: string): Promise<boolean> {
    if (!token) {
      return false;
    }

    try {
      const { Http } = Plugins;
      const result = await Http.request({
        method: 'GET',
        url: `${this.serverUrl}/api/user/token`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return result.status === 200;
    } catch (ex) {
      console.error(ex);
      return Boolean(token);
    }
  }

  async authenticate(username: string, password: string): Promise<AuthResult> {
    try {
      const { Http } = Plugins;
      const result: any = await Http.request({
        method: 'POST',
        url: `${this.serverUrl}/api/user/token`,
        data: {
          username,
          password,
          // TO-DO should pull from GPS
          geolat: 1,
          geolong: 1
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
}
