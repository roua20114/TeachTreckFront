import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../Service/classroom.service';
import { Classroom } from '../Models/classroom';
import { StudentService } from '../Service/student.service';
import { AuthService } from '../Service/auth.service';
import { User } from '../Models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  classrooms:Classroom[]= [];
  studentId!: any ;
  classroomId: any;
  responseMessage: string = '';
  currentUser:  User | null = null ;
  message!: string;

  constructor(private route:ActivatedRoute,private classroomService: ClassroomService, private studentService:StudentService, private authService:AuthService) { 
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.studentId=this.currentUser?.email;
    this.classroomId=this.route.snapshot.paramMap.get('classroomId')
    this.classroomService.getAllclassrooms().subscribe((data: Classroom[]) => {
      this.classrooms = data;
    }, (error) => {
      console.error('Error fetching classrooms', error);
    });
  }
  // joinCourse(classroomId: string, course: any): void {
  //   if (this.currentUser?.id && classroomId) {
  //     // Send join request
  //     this.studentService.sendJoinRequest(this.currentUser?.id, classroomId)
  //       .subscribe({
  //         next: (response) => {
  //           this.responseMessage = response;
  //           course.isPending = true;  // Disable the button and change the text to 'Pending'
  //           alert('Join request sent successfully!');  // Optional alert for success
  //         },
  //         error: (error) => {
  //           this.responseMessage = error;
  //           alert('Failed to send join request: ' + error);  // Optional alert for failure
  //         }
  //       });
  //   } else {
  //     this.responseMessage = 'Missing student ID or classroom ID.';
  //     alert('Please make sure both Student ID and Classroom ID are provided.');
  //   }
  // }
  join(classroomId: string) {
    if (!classroomId || !this.studentId) return;

    this.studentService.createJoinRequest(classroomId, this.studentId)
      .subscribe(
        response => {
          console.log('Join request sent:', response);
          // Optionally update the UI to disable the join button for this classroom
          const classroom = this.classrooms.find(c => c.id === classroomId);
          if (classroom) {
            classroom.isPending = true;
          }
        },
        error => {
          console.error('Error sending join request:', error);
        }
      );
  }
    
}


