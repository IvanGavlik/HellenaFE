import { TestBed } from '@angular/core/testing';

import { ShopingListLocalStorageService } from './shoping-list-local-storage.service';

describe('ShopingListLocalStorageService', () => {
  let service: ShopingListLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopingListLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
