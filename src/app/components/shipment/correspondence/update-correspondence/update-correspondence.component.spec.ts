import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCorrespondenceComponent } from './update-correspondence.component';

describe('UpdateCorrespondenceComponent', () => {
  let component: UpdateCorrespondenceComponent;
  let fixture: ComponentFixture<UpdateCorrespondenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCorrespondenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCorrespondenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
