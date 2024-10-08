import { Component, OnInit } from '@angular/core';
import { ClassroomService } from 'src/app/Service/classroom.service';


@Component({
  selector: 'app-student-in-classroom',
  templateUrl: './student-in-classroom.component.html',
  styleUrls: ['./student-in-classroom.component.css']
})
export class StudentInClassroomComponent implements OnInit {

  classroomCode!: string;
  students: string[] = [];

  constructor(private classroomService: ClassroomService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getStudents() {
    this.classroomService.getStudentsInClassroom(this.classroomCode).subscribe(
      response => {
        this.students = response;
      },
      error => {
        console.error('Error fetching students', error);
      }
    );
  }

}
