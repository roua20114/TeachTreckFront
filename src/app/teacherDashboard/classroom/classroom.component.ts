import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Classroom } from 'src/app/Models/classroom';
import { ClassroomService } from 'src/app/Service/classroom.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {

  classroom: Classroom = new Classroom();

  constructor(private classroomService: ClassroomService, private router: Router) {}
  ngOnInit(): void {
    
  }

  createClassroom() {
    this.classroomService.createClassroom(this.classroom).subscribe(
      response => {
        console.log('Classroom created successfully', response);
        // Handle success (e.g., display a success message, redirect to another page, etc.)
        Swal.fire("Success", "Classroom created successfully")
        this.router.navigate(['/allClassroom'])
      },
      error => {
        console.error('Error creating classroom', error);
        // Handle error (e.g., display an error message)
      }
    );
  }

}
