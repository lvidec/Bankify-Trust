import { TestBed } from '@angular/core/testing';

import { DataPaymentsService } from './data-payments.service';

describe('DataPaymentsService', () => {
  let service: DataPaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
