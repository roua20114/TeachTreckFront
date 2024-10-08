import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  currentUser: any;
  roles:Array<string>=["ADMIN","TEACHER"]

  constructor(private authenticationService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe((x:any) => 
      {
        this.currentUser = x

        if(this.currentUser && this.currentUser.role && !this.roles.includes(this.currentUser.role)){
          this.router.navigate(['/']);
        }
      }
      );
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

}
