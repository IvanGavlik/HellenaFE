import { TestBed } from '@angular/core/testing';

import { SearchUIService } from './search-ui.service';

describe('SearchUIService', () => {
  let service: SearchUIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchUIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
