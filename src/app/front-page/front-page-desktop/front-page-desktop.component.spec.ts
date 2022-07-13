import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPageDesktopComponent } from './front-page-desktop.component';

describe('FrontPageDesktopComponent', () => {
  let component: FrontPageDesktopComponent;
  let fixture: ComponentFixture<FrontPageDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontPageDesktopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontPageDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
