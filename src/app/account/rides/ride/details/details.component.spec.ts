import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideDetailsComponent } from './details.component';

describe('RideDetailsComponent', () => {
  let component: RideDetailsComponent;
  let fixture: ComponentFixture<RideDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RideDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
