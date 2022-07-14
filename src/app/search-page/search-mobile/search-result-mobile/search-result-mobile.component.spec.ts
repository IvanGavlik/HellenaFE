import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultMobileComponent } from './search-result-mobile.component';

describe('SearchResultMobileComponent', () => {
  let component: SearchResultMobileComponent;
  let fixture: ComponentFixture<SearchResultMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
