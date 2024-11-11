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
  studentId: any
  currentUser:  User | null = null ;
  approvedClassrooms: any[] = [];

  constructor(private studentService: StudentService,private authService: AuthService) { 
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.studentId = this.authService.getCurrentUserId();

    // Check if studentId is being retrieved correctly
    console.log('Student ID:', this.studentId);

    if (this.studentId) {
      this.studentService.getApprovedClassrooms(this.studentId).subscribe(
        (classrooms) => {
          console.log('Fetched Approved Classrooms:', classrooms);  // Check what data is coming back
          this.approvedClassrooms = classrooms;
        },
        (error) => {
          console.error('Error fetching approved classrooms:', error);
        }
      );
    } else {
      console.error('Student ID is null');
    }
  
    
  }
    
  
  

}
