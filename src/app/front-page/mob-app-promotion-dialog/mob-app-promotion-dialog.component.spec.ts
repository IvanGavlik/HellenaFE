import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobAppPromotionDialogComponent } from './mob-app-promotion-dialog.component';

describe('MobAppPromotionDialogComponent', () => {
  let component: MobAppPromotionDialogComponent;
  let fixture: ComponentFixture<MobAppPromotionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobAppPromotionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobAppPromotionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
