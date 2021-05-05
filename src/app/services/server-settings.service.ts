import { Injectable } from '@angular/core';
import { ServerSettings } from '../models/server-settings';

const STORE_KEY = 'serverSettings';

const DEFAULT_SETTINGS = {
  serverUrl: 'http://192.168.62.200/bookingService'
};

@Injectable({
  providedIn: 'root'
})
export class ServerSettingsService {
  constructor() { }

  get(): ServerSettings {
    const value = localStorage.getItem(STORE_KEY);
    return value ? JSON.parse(value) : { ...DEFAULT_SETTINGS };
  }

  set(settings: ServerSettings): void {
    localStorage.setItem(STORE_KEY, JSON.stringify(settings));
  }
}
