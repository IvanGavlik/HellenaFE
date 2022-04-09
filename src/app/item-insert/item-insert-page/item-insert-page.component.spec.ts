import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInsertPageComponent } from './item-insert-page.component';

describe('ItemInsertPageComponent', () => {
  let component: ItemInsertPageComponent;
  let fixture: ComponentFixture<ItemInsertPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemInsertPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemInsertPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
