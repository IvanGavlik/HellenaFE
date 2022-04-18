import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultBoxComponent } from './search-result-box.component';

describe('SearchResultBoxComponent', () => {
  let component: SearchResultBoxComponent;
  let fixture: ComponentFixture<SearchResultBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
