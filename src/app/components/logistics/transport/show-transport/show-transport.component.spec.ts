import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTransportComponent } from './show-transport.component';

describe('ShowTransportComponent', () => {
  let component: ShowTransportComponent;
  let fixture: ComponentFixture<ShowTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowTransportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
