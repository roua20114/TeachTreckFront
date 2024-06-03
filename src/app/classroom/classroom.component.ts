import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../Service/classroom.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {

  classroomForm: FormGroup;
  pupilForm: FormGroup;
  classroom: any;
  ngOnInit(): void {
      
  }

  constructor(private classroomService: ClassroomService, private fb: FormBuilder) {
    this.classroomForm = this.fb.group({
      name: ['']
    });
    this.pupilForm = this.fb.group({
      code: [''],
      email: ['']
    });
  }

  createClassroom() {
    const name = this.classroomForm.get('name')?.value;
    this.classroomService.createClassroom(name).subscribe(data => {
      this.classroom = data;
    });
  }

  addPupilToClassroom() {
    const code = this.pupilForm.get('code')?.value;
    const email = this.pupilForm.get('email')?.value;
    this.classroomService.addPupilToClassroom(code, email).subscribe(data => {
      this.classroom = data;
    });
  }

}
