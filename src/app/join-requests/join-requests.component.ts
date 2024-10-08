import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../Service/teacher.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import Swal from 'sweetalert2';
import { JoinRequest } from '../Models/join-request';

@Component({
  selector: 'app-join-requests',
  templateUrl: './join-requests.component.html',
  styleUrls: ['./join-requests.component.css']
})
export class JoinRequestsComponent implements OnInit {
  classroomId: any;
  joinRequests: any[] = [];
  studentId: any;
 
  pendingRequests: JoinRequest[] = [];
  message!: string;
  constructor(private teacherService: TeacherService,
    private route: ActivatedRoute, private authservice:AuthService) { }

  ngOnInit(): void {
   
    this.classroomId = this.route.snapshot.paramMap.get('classroomId') ;
   
    console.log(this.classroomId);
    console.log(this.studentId);
    
    this.fetchJoinRequests();
  }
  fetchJoinRequests(): void {
    this.teacherService.getJoinRequestsByClassroom(this.classroomId).subscribe(
      (requests) => {
        this.joinRequests = requests;
      },
      (error) => {
        console.error('Failed to fetch join requests:', error);
      }
    );
  }
  approveRequest(requestId: string) {
    this.teacherService.approveRequest(requestId).subscribe(response => {
      console.log('Request approved:', response);
      Swal.fire('Success','Request approved successfully','success')
    });
  }
  // rejectRequest(requestId: string): void {
  //   this.teacherService.rejectJoinRequest(requestId).subscribe(
  //     () => {
  //       Swal.fire('Success', 'Join request rejected', 'success');
  //       this.joinRequests = this.joinRequests.filter(request => request.id !== requestId);
  //       this.fetchJoinRequests(); // Refresh the list after rejection
  //     },
  //     (error) => {
  //       console.error('Failed to reject request:', error);
  //     }
  //   );
  // }
  rejectRequest(requestId: string) {
    this.teacherService.rejectRequest(requestId).subscribe(response => {
      console.log('Request rejected:', response);
      Swal.fire('Failed','Request rejected ','success')
    });
  }

}
