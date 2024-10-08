import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerStudentComponent } from './answer-student.component';

describe('AnswerStudentComponent', () => {
  let component: AnswerStudentComponent;
  let fixture: ComponentFixture<AnswerStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
