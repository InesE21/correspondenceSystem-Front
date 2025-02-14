import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRouteComponent } from './show-route.component';

describe('ShowRouteComponent', () => {
  let component: ShowRouteComponent;
  let fixture: ComponentFixture<ShowRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
