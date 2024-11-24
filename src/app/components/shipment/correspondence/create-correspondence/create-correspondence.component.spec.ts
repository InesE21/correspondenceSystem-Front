import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCorrespondenceComponent } from './create-correspondence.component';

describe('CreateCorrespondenceComponent', () => {
  let component: CreateCorrespondenceComponent;
  let fixture: ComponentFixture<CreateCorrespondenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCorrespondenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCorrespondenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
