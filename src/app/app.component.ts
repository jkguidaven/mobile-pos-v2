import { Component, OnInit } from '@angular/core';
import { GeolocationWatcherService } from './services/geolocation-watcher.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private geolocationWatcher: GeolocationWatcherService) {}

  ngOnInit() {
    this.geolocationWatcher.watch();
  }
}
