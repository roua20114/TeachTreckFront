import { Component, OnInit } from '@angular/core';
import { StudentService } from '../Service/student.service';
import { Classroom } from '../Models/classroom';

@Component({
  selector: 'app-joined-classrooms',
  templateUrl: './joined-classrooms.component.html',
  styleUrls: ['./joined-classrooms.component.css']
})
export class JoinedClassroomsComponent implements OnInit {

  classrooms: Classroom[] = [];
    studentId: any 
  

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getApprovedClassrooms(this.studentId).subscribe(
      (data) => {
          this.classrooms = data;
      },
      (error) => {
          console.error('Error fetching classrooms', error);
      }
  );
}
  

}
