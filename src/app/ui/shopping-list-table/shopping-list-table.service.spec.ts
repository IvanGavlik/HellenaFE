import { TestBed } from '@angular/core/testing';

import { ShoppingLIstTableService } from './shopping-list-table.service';

describe('ShoppingLIstTableService', () => {
  let service: ShoppingLIstTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingLIstTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
