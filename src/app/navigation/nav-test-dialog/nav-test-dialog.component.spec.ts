import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTestDialogComponent } from './nav-test-dialog.component';

describe('NavTestDialogComponent', () => {
  let component: NavTestDialogComponent;
  let fixture: ComponentFixture<NavTestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavTestDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavTestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
