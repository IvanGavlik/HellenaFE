import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormMobileComponent } from './search-form-mobile.component';

describe('SearchFormMobileComponent', () => {
  let component: SearchFormMobileComponent;
  let fixture: ComponentFixture<SearchFormMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFormMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
