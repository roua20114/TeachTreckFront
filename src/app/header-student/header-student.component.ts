import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-student',
  templateUrl: './header-student.component.html',
  styleUrls: ['./header-student.component.css']
})
export class HeaderStudentComponent implements OnInit {
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
