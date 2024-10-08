import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassroomService } from '../Service/classroom.service';
import { User } from '../Models/user';
import { AuthService } from '../Service/auth.service';
import { Classroom } from '../Models/classroom';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-invite-students',
  templateUrl: './invite-students.component.html',
  styleUrls: ['./invite-students.component.css']
})
export class InviteStudentsComponent implements OnInit {
  searchQuery: string = '';
  classroomId: any;
  email!: string;
  message!: string;
  students!:User[]
  currentUser:User | null = null ;
  classroom!: Classroom;
  
  constructor(  private route: ActivatedRoute,
    private classroomService: ClassroomService,
  private   authenticationService: AuthService,public dialogRef: MatDialogRef<InviteStudentsComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { classroomId: string }) {  this.route.params.subscribe((params) => {
      
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }); }
  

  ngOnInit(): void {
   
  }
  filteredStudents() {
    return this.students.filter(student =>
      student.username?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      student.email?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  getClassroomDetails(): void {
    this.classroomService.getByIdClassroom(this.classroomId)
      .subscribe(
        (data: Classroom) => {
          this.classroom = data;
        },
        error => {
          console.error('Error fetching classroom details', error);
          // Handle error scenario as needed
        }
      );
  }

 

  addStudent() {
   
      if (this.email) {
        console.log('Classroom ID:', this.data.classroomId); // Ensure classroomId is passed
        this.classroomService
          .addPupilToClassroom(this.data.classroomId, this.email)
          .subscribe(
            (response) => {
              this.message = 'Pupil added successfully!';
              this.dialogRef.close(); // Close dialog after success
            },
            (error) => {
              this.message = 'Failed to add pupil: ' + error.error;
            }
          );
      } else {
        this.message = 'Please enter a valid email.';
      }
    }
}


