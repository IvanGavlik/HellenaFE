import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCategoryContainerComponent } from './item-category-container.component';

describe('ItemCategoryContainerComponent', () => {
  let component: ItemCategoryContainerComponent;
  let fixture: ComponentFixture<ItemCategoryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCategoryContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCategoryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
