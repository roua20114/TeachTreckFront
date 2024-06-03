import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from 'src/app/Service/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  pupilForm: FormGroup;

  constructor(private pupilService: StudentService , private fb: FormBuilder) {
    this.pupilForm = this.fb.group({
      email: [''],
      name: ['']
    });
  }
  ngOnInit() {}

  createPupil() {
    const email = this.pupilForm.get('email')?.value;
    const name = this.pupilForm.get('name')?.value;
    this.pupilService.createPupil(email, name).subscribe();
  }
}
