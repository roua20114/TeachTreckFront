import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilTeacherComponent } from './profil-teacher.component';

describe('ProfilTeacherComponent', () => {
  let component: ProfilTeacherComponent;
  let fixture: ComponentFixture<ProfilTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
