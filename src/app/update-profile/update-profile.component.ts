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
  selectedFile: File | null = null;
  id:any;
 
  userId!: any;
  user: User | undefined;
  currentUser:  User | null = null ;


  constructor(private teacherService:TeacherService, private fb: FormBuilder, 
    private route: ActivatedRoute,private authenticationService:AuthService,
    private router: Router) {this.authenticationService.currentUser.subscribe(x => this.currentUser = x);}



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
      profilePictureUrl: [this.currentUser?.ProfilePictureUrl],
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

  onSubmit() {
    if (this.profileForm.invalid || !this.selectedFile) {
      alert('Please fill out the form and select a profile picture.');
      return;
    }

    const updatedUser: User = {
      id: this.userId,
      email: this.profileForm.value.email,
      username: this.profileForm.value.username,
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      mobile: this.profileForm.value.mobile,
      address: this.profileForm.value.address
    };

    this.teacherService.updateUserProfile(this.userId, updatedUser, this.selectedFile)
      .subscribe({
        next: (user) => {
          console.log('Profile updated successfully', user);
          alert('Profile updated successfully!');
        },
        error: (err) => {
          console.error('Error updating profile', err);
          alert('Error updating profile.');
        }
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

}
