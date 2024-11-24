import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCorrespondenceComponent } from './show-correspondence.component';

describe('ShowCorrespondenceComponent', () => {
  let component: ShowCorrespondenceComponent;
  let fixture: ComponentFixture<ShowCorrespondenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCorrespondenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCorrespondenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
