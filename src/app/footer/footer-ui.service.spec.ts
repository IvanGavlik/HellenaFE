import { TestBed } from '@angular/core/testing';

import { FooterUiService } from './footer-ui.service';

describe('FooterUiService', () => {
  let service: FooterUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FooterUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
