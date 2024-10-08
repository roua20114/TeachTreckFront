import { Component, OnInit } from '@angular/core';
import { Classroom } from '../Models/classroom';
import { ClassroomService } from '../Service/classroom.service';
import { StudentService } from '../Service/student.service';
import { AuthService } from '../Service/auth.service';
import { User } from '../Models/user';

@Component({
  selector: 'app-joined-class-list',
  templateUrl: './joined-class-list.component.html',
  styleUrls: ['./joined-class-list.component.css']
})
export class JoinedClassListComponent implements OnInit {
  classrooms: Classroom[] = [];
  studentId: string| null = null
  currentUser:  User | null = null ;

  constructor(private studentService: StudentService,private authService: AuthService) { 
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.studentId = this.authService.getCurrentUserId();
    if (this.studentId) {
      this.studentService.getJoinedClassrooms(this.studentId).subscribe(
        (data: Classroom[]) => {
          this.classrooms = data;
        },
        (error) => {
          console.error('Failed to load joined classrooms', error);
        }
      );
    } else {
      console.error('No student ID found');
    }
  }
    
  
  

}
