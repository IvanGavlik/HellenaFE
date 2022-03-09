import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFooterComponent } from './update-footer.component';

describe('UpdateFooterComponent', () => {
  let component: UpdateFooterComponent;
  let fixture: ComponentFixture<UpdateFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
