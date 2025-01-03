import { Component, Injector, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../Service/teacher.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../Models/user';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profil-teacher',
  templateUrl: './profil-teacher.component.html',
  styleUrls: ['./profil-teacher.component.css']
})
export class ProfilTeacherComponent implements OnInit {
 
  selectedFile: File | null = null;
  teacherId:any;
  
  profileinfo!: User;
  
  id: any;
  userId:any
  profilePictureUrl: SafeUrl | null = null; 
  constructor(private service:AuthService, private inject:Injector,private router:Router , private teacherService: TeacherService,private authService:AuthService,
    private route:ActivatedRoute,private http: HttpClient,private sanitizer: DomSanitizer
  
  ) { }

  ngOnInit(): void {
    this.profileinfo = this.service.currentUserValue;
    this.teacherId= this.authService.getCurrentUserId()
    this.loadProfile();
  console.log("Profile Info:", this.profileinfo);  // Check if profileinfo has the expected data
  
  if (!this.profileinfo) {
    this.router.navigateByUrl('/login');
  } else {
    this.teacherId = this.profileinfo.id;  // Adjust if the key is different, e.g., profileinfo.teacherId
    console.log("Teacher ID:", this.teacherId);  // Ensure that teacherId is properly set
  }
  this.userId = this.route.snapshot.paramMap.get('id');
    this.teacherService.getTeacherProfile(this.teacherId).subscribe((data: User) => {
      this.profileinfo = data;
       // Load profile picture after fetching user data
    });
    this.http.get(`http://localhost:8081/user-actions/${this.userId}/profilePicture`, { responseType: 'blob' })
    .subscribe(blob => {
      const objectURL = URL.createObjectURL(blob);
      this.profilePictureUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL); 
      
    }, error => {
      console.error('Failed to load profile picture');
    });
  }
 
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log("File selected:", file.name);  // Debugging line to check if the file is selected correctly
    }
  }


  onUpload(): void {
    if (!this.teacherId) {
      console.error('Teacher ID is missing, cannot upload profile picture');
      return;
    }
  
    if (this.selectedFile) {
      this.teacherService.uploadProfilePicture(this.teacherId, this.selectedFile).subscribe({
        next: (response) => {
          console.log('Profile picture uploaded successfully', response);
          this.profilePictureUrl = response.profilePictureUrl;  // Adjust based on your API response
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error uploading profile picture', error);
        }
      });
    } else {
      console.error('No file selected');
    }
  }
  loadProfile(): void {
     // Use the actual user ID

    // Fetch user profile details, including the profile picture URL
    this.teacherService.getUserProfile(this.teacherId).subscribe((profile: User) => {
      this.profileinfo = profile;
     
    }, (error) => {
      console.error('Error loading profile', error);
      // Handle error
    });
  }
  
  
  
  

}
