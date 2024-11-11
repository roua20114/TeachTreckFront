import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassroomService } from 'src/app/Service/classroom.service';


@Component({
  selector: 'app-student-in-classroom',
  templateUrl: './student-in-classroom.component.html',
  styleUrls: ['./student-in-classroom.component.css']
})
export class StudentInClassroomComponent implements OnInit {

  classroomCode!: string;
  classroomId:any;
  students: string[] = [];

  constructor(private classroomService: ClassroomService,private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.classroomId = this.route.snapshot.paramMap.get('classroomId');
   
  }

  getStudents() {
    this.classroomService.getStudentsInClassroom(this.classroomId).subscribe(
      (students) => {
        this.students = students;
      },
      error => {
        console.error('Error fetching students', error);
      }
    );
  }

}
