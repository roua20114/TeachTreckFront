import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.css']
})
export class StudentHeaderComponent implements OnInit {
  currentUser:  User | null = null ;
  id:any
  student:any

  constructor( private authser:AuthService) {  this.authser.currentUser.subscribe(x => this.currentUser = x)}

  ngOnInit(): void {
  }

}
