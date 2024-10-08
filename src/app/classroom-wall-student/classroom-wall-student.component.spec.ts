import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomWallStudentComponent } from './classroom-wall-student.component';

describe('ClassroomWallStudentComponent', () => {
  let component: ClassroomWallStudentComponent;
  let fixture: ComponentFixture<ClassroomWallStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomWallStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomWallStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
