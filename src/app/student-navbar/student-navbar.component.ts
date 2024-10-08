import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-navbar',
  templateUrl: './student-navbar.component.html',
  styleUrls: ['./student-navbar.component.css']
})
export class StudentNavbarComponent implements OnInit {
  classroomId: any;

  constructor(private router: Router, private route: ActivatedRoute,) { 
    this.classroomId = this.route.snapshot.paramMap.get('classroomId')!;
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
