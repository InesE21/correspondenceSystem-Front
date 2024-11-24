import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBranchComponent } from './show-branch.component';

describe('ShowBranchComponent', () => {
  let component: ShowBranchComponent;
  let fixture: ComponentFixture<ShowBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowBranchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
