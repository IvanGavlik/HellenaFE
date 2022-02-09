import { TestBed } from '@angular/core/testing';

import { ShoppingLIstService } from './shopping-list.service';

describe('ShoppingLIstService', () => {
  let service: ShoppingLIstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingLIstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
