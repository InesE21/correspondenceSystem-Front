import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowServiceComponent } from './show-service.component';

describe('ShowServiceComponent', () => {
  let component: ShowServiceComponent;
  let fixture: ComponentFixture<ShowServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
