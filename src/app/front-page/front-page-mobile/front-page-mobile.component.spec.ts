import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPageMobileComponent } from './front-page-mobile.component';

describe('FrontPageMobileComponent', () => {
  let component: FrontPageMobileComponent;
  let fixture: ComponentFixture<FrontPageMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontPageMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontPageMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
