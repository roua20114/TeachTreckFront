import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Models/user';
import { ClassroomService } from '../Service/classroom.service';
import { Classroom } from '../Models/classroom';
import { MatDialog } from '@angular/material/dialog';
import { InviteStudentsComponent } from '../invite-students/invite-students.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  currentUser:  User | null = null ;
  classes: Classroom[] = [];
  classroomId: any;
  classroom!: Classroom;
  class!:Classroom;
  students: string[] = [];
  isLoading = true;
  errorMessage = '';
  successMessage = '';

  constructor(private authenticationService: AuthService,
    private router: Router, private route: ActivatedRoute,public dialog: MatDialog,
    private classroomService: ClassroomService) {  this.route.params.subscribe((params) => {
      this.classroomId = params['classroomId'];
    }); 
     this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit(): void {
    this.classroomId = this.route.snapshot.paramMap.get('classroomId')|| '';

    // Ensure classroomId is not null or empty
    if (!this.classroomId) {
      console.error('classroomId is missing from the URL!');
    } 
    if (this.classroomId) {
      this.classroomService.getStudentsInClassroom(this.classroomId).subscribe({
        next: (data) => {
          this.students = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Failed to load students. Please try again later.';
          this.isLoading = false;
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Classroom ID is missing.';
      this.isLoading = false;
    }
    this.loadStudents();
  }
  loadStudents(): void {
    this.isLoading = true;
    this.classroomService.getStudentsInClassroom(this.classroomId).subscribe({
      next: (data) => {
        this.students = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load students. Please try again later.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
  deleteStudent(email: string): void {
    this.classroomService.deleteStudentFromClassroom(this.classroomId, email).subscribe({
      next: (response) => {
        this.successMessage = response;
        // Remove the student from the local list without reloading the page
        this.students = this.students.filter(student => student !== email);
      },
      error: (err) => {
        this.errorMessage = 'Failed to remove the student. Try again later.';
        console.error(err);
      }
    });
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
  openInviteDialog() {
    this.dialog.open(InviteStudentsComponent, {
      width: '400px',
      data: { classroomId: this.classroomId },
    });
  }

}
