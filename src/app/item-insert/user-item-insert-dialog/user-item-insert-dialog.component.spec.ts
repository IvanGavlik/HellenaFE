import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemInsertDialogComponent } from './user-item-insert-dialog.component';

describe('UserItemInsertDialogComponent', () => {
  let component: UserItemInsertDialogComponent;
  let fixture: ComponentFixture<UserItemInsertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserItemInsertDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserItemInsertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
