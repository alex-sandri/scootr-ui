import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedOutHomeComponent } from './signed-out.component';

describe('SignedOutHomeComponent', () => {
  let component: SignedOutHomeComponent;
  let fixture: ComponentFixture<SignedOutHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignedOutHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedOutHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
