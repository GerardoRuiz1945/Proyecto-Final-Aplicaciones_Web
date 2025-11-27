import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveReservations } from './active-reservations';

describe('ActiveReservations', () => {
  let component: ActiveReservations;
  let fixture: ComponentFixture<ActiveReservations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveReservations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveReservations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
