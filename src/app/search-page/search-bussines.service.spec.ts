import { TestBed } from '@angular/core/testing';

import { SearchBussinesService } from './search-bussines.service';

describe('SearchBussinesService', () => {
  let service: SearchBussinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchBussinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
