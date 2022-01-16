import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyDealContainerComponent } from './daily-deal-container.component';

describe('DailyDealContainerComponent', () => {
  let component: DailyDealContainerComponent;
  let fixture: ComponentFixture<DailyDealContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyDealContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyDealContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
