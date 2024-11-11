import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../Service/teacher.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import Swal from 'sweetalert2';
import { JoinRequest } from '../Models/join-request';
import { StudentService } from '../Service/student.service';

@Component({
  selector: 'app-join-requests',
  templateUrl: './join-requests.component.html',
  styleUrls: ['./join-requests.component.css']
})
export class JoinRequestsComponent implements OnInit {
  classroomId: any;
  joinRequests: any[] = [];
  studentId: any;
 
  pendingRequests: any[] = [];
  message!: string;
  constructor(private teacherService: StudentService,
    private route: ActivatedRoute, private authservice:AuthService) { }

  ngOnInit(): void {
   
    this.classroomId = this.route.snapshot.paramMap.get('classroomId') ;
   
    console.log(this.classroomId);
    console.log(this.studentId);
    
    this.teacherService.getPendingRequests(this.classroomId).subscribe((requests) => {
      this.pendingRequests = requests;
    });

    
  }
  // fetchJoinRequests(): void {
  //   this.teacherService.getJoinRequestsByClassroom(this.classroomId).subscribe(
  //     (requests) => {
  //       this.joinRequests = requests;
  //     },
  //     (error) => {
  //       console.error('Failed to fetch join requests:', error);
  //     }
  //   );
  // }
  // approveRequest(requestId: string) {
  //   this.teacherService.approveRequest(requestId).subscribe(response => {
  //     console.log('Request approved:', response);
  //     Swal.fire('Success','Request approved successfully','success')
  //   });
  // }

  // rejectRequest(requestId: string) {
  //   this.teacherService.rejectRequest(requestId).subscribe(response => {
  //     console.log('Request rejected:', response);
  //     Swal.fire('Failed','Request rejected ','success')
  //   });
  // }

  approveRequest(requestId: string) {
    this.teacherService.updateRequestStatus(requestId, 'APPROVED').subscribe((response) => {
      console.log('Request approved', response);
      Swal.fire('Sucess','Request is approved','success')
      this.pendingRequests = this.pendingRequests.filter(req => req.id !== requestId); // remove approved request from list
    });
  }

  rejectRequest(requestId: string) {
    this.teacherService.updateRequestStatus(requestId, 'REJECTED').subscribe((response) => {
      console.log('Request rejected', response);
      this.pendingRequests = this.pendingRequests.filter(req => req.id !== requestId); // remove rejected request from list
    });
  }

  

}
