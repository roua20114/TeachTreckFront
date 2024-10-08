import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { Classroom } from '../Models/classroom';
import { StudentService } from '../Service/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-people-list-studnt',
  templateUrl: './people-list-studnt.component.html',
  styleUrls: ['./people-list-studnt.component.css']
})
export class PeopleListStudntComponent implements OnInit {
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
    private studentService: StudentService) {
      this.route.params.subscribe((params) => {
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
      this.studentService.getStudentsInClassroom(this.classroomId).subscribe({
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
    this.studentService.getStudentsInClassroom(this.classroomId).subscribe({
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

}
