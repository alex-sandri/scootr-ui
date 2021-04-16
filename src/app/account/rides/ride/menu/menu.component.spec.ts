import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideMenuComponent } from './menu.component';

describe('RideMenuComponent', () => {
  let component: RideMenuComponent;
  let fixture: ComponentFixture<RideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
