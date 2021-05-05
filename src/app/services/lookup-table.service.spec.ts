import { TestBed } from '@angular/core/testing';

import { LookupTableService } from './lookup-table.service';

describe('LookupTableService', () => {
  let service: LookupTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LookupTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
