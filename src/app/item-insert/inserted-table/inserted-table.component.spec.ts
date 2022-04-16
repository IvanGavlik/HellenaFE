import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertedTableComponent } from './inserted-table.component';

describe('InsertedTableComponent', () => {
  let component: InsertedTableComponent;
  let fixture: ComponentFixture<InsertedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertedTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
