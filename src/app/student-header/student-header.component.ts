import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../Models/user';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.css']
})
export class StudentHeaderComponent implements OnInit {
  currentUser:  User | null = null ;
  id:any
  student:any
  userId:any;
  profilePictureUrl: SafeUrl | null = null;  
   @Output() profilePictureChange = new EventEmitter<SafeUrl>();
  constructor( private authser:AuthService,private router:Router,private http: HttpClient,private sanitizer: DomSanitizer,) {  this.authser.currentUser.subscribe(x => this.currentUser = x)}

  ngOnInit(): void {
    this.userId = this.authser.getCurrentUserId();
   

    this.http.get(`http://localhost:8081/user-actions/${this.userId}/profilePicture`, { responseType: 'blob' })
    .subscribe(blob => {
      const objectURL = URL.createObjectURL(blob);
      this.profilePictureUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL); 
      this.profilePictureChange.emit(this.profilePictureUrl)
      
    }, error => {
      console.error('Failed to load profile picture');
    });
  }
  logout() {
    this.authser.logout();
    this.router.navigate(['/login']);
  }

}
