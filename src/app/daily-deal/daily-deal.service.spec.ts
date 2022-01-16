import { TestBed } from '@angular/core/testing';

import { DailyDealService } from './daily-deal.service';

describe('DailyDealService', () => {
  let service: DailyDealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyDealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
