import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamEvaluateComponent } from './exam-evaluate.component';

describe('ExamEvaluateComponent', () => {
  let component: ExamEvaluateComponent;
  let fixture: ComponentFixture<ExamEvaluateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamEvaluateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamEvaluateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
