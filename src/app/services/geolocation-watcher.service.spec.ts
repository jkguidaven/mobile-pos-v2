import { TestBed } from '@angular/core/testing';

import { GeolocationWatcherService } from './geolocation-watcher.service';

describe('GeolocationWatcherService', () => {
  let service: GeolocationWatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocationWatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
