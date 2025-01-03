import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '../Service/teacher.service';
import { User } from '../Models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  profilePicturePreview: string | ArrayBuffer | null = null;
  errorMessage: string = ''; 
  profileForm!: FormGroup;
  
  id:any;
 
  userId!: any;
  user: User | undefined;
  currentUser:  User | null = null ;
  selectedFile!: File;
  profilePictureUrl: string = '';

  constructor(private teacherService:TeacherService, private fb: FormBuilder, 
    private route: ActivatedRoute,private authenticationService:AuthService,
    private router: Router,private http: HttpClient) {this.authenticationService.currentUser.subscribe(x => this.currentUser = x);}



  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.teacherService .getUserById(this.userId).subscribe(
      (user: User) => {
        this.user = user;
        this.createForm();
      },
      (error) => {
        console.log('Error fetching user profile', error);
      }
    );
  }
  


  // Handle file selection and preview
  // onFileSelected(event: Event): void {
  //   const file = (event.target as HTMLInputElement).files![0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.profilePicturePreview = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  createForm(): void {
    this.profileForm = this.fb.group({
      profilePictureUrl: [this.currentUser?.profilePictureUrl],
      email: [this.currentUser?.email, [Validators.required, Validators.email]],
      username: [this.currentUser?.username, Validators.required],
      firstName: [this.currentUser?.firstName, Validators.required],
      lastName: [this.currentUser?.lastName],
      mobile: [this.currentUser?.mobile],
     
      address: [this.currentUser?.address],
      
     
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  loadUserProfile() {
    this.http.get(`http://localhost:8081/user-actions/${this.userId}`)
      .subscribe((user: User) => {
        this.user = user;
        this.profilePictureUrl = `http://localhost:8081/user-actions/${this.userId}/profilePicture`;
      }, error => {
        console.error('Failed to load user profile');
      });
  }

  onSubmit() {
    const formData = new FormData();
    
    // Append user data
    formData.append('updatedUser', new Blob([JSON.stringify(this.user)], {
      type: 'application/json'
    }));
    
    // Append profile picture file if a new one was selected
    if (this.selectedFile) {
      formData.append('profilePicture', this.selectedFile);
    }

    this.http.put(`http://localhost:8081/user-actions/updateprofile/${this.userId}`, formData)
      .subscribe(response => {
        console.log('Profile updated successfully');
        this.loadUserProfile(); 
        this.router.navigate(['/profile',this.userId]) // Refresh the profile to get the updated picture
      }, error => {
        console.error('Failed to update profile');
      });
  }
  deleteUserProfile(id:string) {
    if (confirm('Are you sure you want to delete your profile?')) {
      this.teacherService.deleteUserProfile(id).subscribe(
        response => {
          alert('User profile deleted successfully.');
          this.router.navigate(['/']); // Redirect after successful deletion
        },
        error => {
          alert('Failed to delete the user profile.');
          console.error('Delete profile error:', error);
        }
      );
    }
  }
  uploadProfilePicture() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post(`http://localhost:8081/user-actions/${this.userId}/uploadProfilePicture`, formData)
      .subscribe(response => {
        console.log('Profile picture uploaded successfully');
      }, error => {
        console.error('Failed to upload profile picture');
      });
  }

}
