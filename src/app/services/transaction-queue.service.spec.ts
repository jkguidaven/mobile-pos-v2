import { TestBed } from '@angular/core/testing';

import { TransactionQueueService } from './transaction-queue.service';

describe('TransactionQueueService', () => {
  let service: TransactionQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
