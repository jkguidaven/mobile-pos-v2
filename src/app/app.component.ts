import { Component, OnInit } from '@angular/core';
import { GeolocationWatcherService } from './services/geolocation-watcher.service';
import { LookupTableService } from './services/lookup-table.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private geolocationWatcher: GeolocationWatcherService,
    private lookuptableService: LookupTableService) {}

  ngOnInit() {
    this.geolocationWatcher.watch();
    this.lookuptableService.load();
  }
}
