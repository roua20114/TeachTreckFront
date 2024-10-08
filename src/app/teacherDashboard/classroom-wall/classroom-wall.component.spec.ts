import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomWallComponent } from './classroom-wall.component';

describe('ClassroomWallComponent', () => {
  let component: ClassroomWallComponent;
  let fixture: ComponentFixture<ClassroomWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomWallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
