import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPuppilComponent } from './add-puppil.component';

describe('AddPuppilComponent', () => {
  let component: AddPuppilComponent;
  let fixture: ComponentFixture<AddPuppilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPuppilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPuppilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
