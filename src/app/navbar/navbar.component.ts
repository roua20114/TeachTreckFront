import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  classroomId: any;
  teacherId:any;

  constructor(private router: Router, private route: ActivatedRoute,) { 
    this.classroomId = this.route.snapshot.paramMap.get('id')!;
    this.teacherId=this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

  }
  goToPeoplePage() {
    this.router.navigate(['/people', this.classroomId]);
  }
  goToRequestPage(){
    this.router.navigate(['/joinrequest', this.classroomId]);
  }
  

}
