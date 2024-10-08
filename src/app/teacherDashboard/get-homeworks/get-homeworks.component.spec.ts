import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetHomeworksComponent } from './get-homeworks.component';

describe('GetHomeworksComponent', () => {
  let component: GetHomeworksComponent;
  let fixture: ComponentFixture<GetHomeworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetHomeworksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetHomeworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
