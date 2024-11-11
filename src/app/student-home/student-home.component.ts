import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../Service/classroom.service';
import { Classroom } from '../Models/classroom';
import { StudentService } from '../Service/student.service';
import { AuthService } from '../Service/auth.service';
import { User } from '../Models/user';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { JoinRequest } from '../Models/join-request';

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
  userId:any;
  errorMessage: string = '';
  joinRequests: JoinRequest[] = [];

  constructor(private route:ActivatedRoute,private classroomService: ClassroomService, private studentService:StudentService, private authService:AuthService) { 
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.studentId=this.currentUser?.email;
    this.classroomId=this.route.snapshot.paramMap.get('classroomId')
    this.userId = this.authService.getCurrentUserId();
    this.classroomService.getAllclassrooms().subscribe((data: Classroom[]) => {
      this.classrooms = data
      this.filterClassrooms(); 
    }, (error) => {
      console.error('Error fetching classrooms', error);
    });
    
  }
  filterClassrooms() {
    // Get IDs of classrooms with pending join requests
    const pendingClassroomIds = this.joinRequests
      .filter(request => request.status === 'pending') // Look for 'pending' status
      .map(request => request.classroomId);

    // Filter out classrooms that are pending
    this.classrooms = this.classrooms.filter(classroom => !pendingClassroomIds.includes(classroom.id));
  }


  sendJoinRequest(classroomId: string) {
    // Check if userId (studentId) and classroomId are both available before sending the request
    if (this.userId && classroomId) {
      this.studentService.sendJoinRequest(classroomId, this.userId).subscribe(
        (response) => {
          console.log('Join request sent successfully', response);
          
          Swal.fire('Success','Request sent successfully','success')
          this.ngOnInit();
        },
        (error) => {
          console.error('Error sending join request:', error);
        }
      );
    } else {
      this.errorMessage = 'Student ID or Classroom ID is missing';
      console.error(this.errorMessage);
    }
  }
    
}


