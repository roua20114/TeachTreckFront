import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../Models/user';
import { AuthService } from '../Service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header-student',
  templateUrl: './header-student.component.html',
  styleUrls: ['./header-student.component.css']
})
export class HeaderStudentComponent implements OnInit {
  currentUser:  User | null = null ;
  id:any;
  profileinfo!: User;
  userId:any;
  profilePictureUrl: SafeUrl | null = null; 

  @Output() profilePictureChange = new EventEmitter<SafeUrl>();
  constructor( private authenticationService: AuthService,private http: HttpClient,private sanitizer: DomSanitizer,private route:ActivatedRoute,
    private router: Router
) { this.authenticationService.currentUser.subscribe(x => this.currentUser = x);}

  ngOnInit(): void {
    // Adjust if the key is different, e.g., profileinfo.teacherId
    this.userId = this.authenticationService.getCurrentUserId();
    // this.userId = this.route.snapshot.paramMap.get('studentId');

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
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
