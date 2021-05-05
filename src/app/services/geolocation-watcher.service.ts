import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state';
import * as actions from '../store/actions/location.action';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { LocationCoordinates } from '../models/location-coordinates';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeolocationWatcherService {
  constructor(
    private store: Store<AppState>,
    private geolocation: Geolocation) { }

  watch() {
    this.geolocation.watchPosition().subscribe((position: Geoposition) => {
      this.store.dispatch(actions.setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }));
    });
  }

  getCurrent(): Promise<LocationCoordinates> {
    return this.store.select('location').pipe(take(1)).toPromise();
  }
}
