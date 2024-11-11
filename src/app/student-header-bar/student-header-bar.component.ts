import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { User } from '../Models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-header-bar',
  templateUrl: './student-header-bar.component.html',
  styleUrls: ['./student-header-bar.component.css']
})
export class StudentHeaderBarComponent implements OnInit {

  currentUser:  User | null = null ;
  id:any

  constructor( private authenticationService: AuthService,
    private router: Router
) { this.authenticationService.currentUser.subscribe(x => this.currentUser = x);}


  ngOnInit(): void {
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
