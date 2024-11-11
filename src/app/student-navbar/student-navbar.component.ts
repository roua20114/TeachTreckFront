import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Models/user';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-student-navbar',
  templateUrl: './student-navbar.component.html',
  styleUrls: ['./student-navbar.component.css']
})
export class StudentNavbarComponent implements OnInit {
  classroomId: any;
  studentId:any;
  
  // ProfilePictureUrl!: string;


  constructor(private router: Router, private route: ActivatedRoute) { 
    this.classroomId = this.route.snapshot.paramMap.get('classroomId')!;
    this.studentId=this.route.snapshot.paramMap.get('id')!
  }

  ngOnInit(): void {
    
  }
  goToPeoplePage() {
    this.router.navigate(['/peoplelist', this.classroomId]);
  }
  goToRequestPage(){
    this.router.navigate(['/joinrequest', this.classroomId]);
  }
  

}
