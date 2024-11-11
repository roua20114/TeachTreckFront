import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {
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
    
    this.userId = this.authenticationService.getCurrentUserId();
    // this.userId = this.route.snapshot.paramMap.get('techerId');
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
