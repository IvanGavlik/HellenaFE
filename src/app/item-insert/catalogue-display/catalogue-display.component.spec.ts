import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueDisplayComponent } from './catalogue-display.component';

describe('CatalogueDisplayComponent', () => {
  let component: CatalogueDisplayComponent;
  let fixture: ComponentFixture<CatalogueDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
