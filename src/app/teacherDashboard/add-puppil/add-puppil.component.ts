import { Component, OnInit } from '@angular/core';
import { ClassroomService } from 'src/app/Service/classroom.service';


@Component({
  selector: 'app-add-puppil',
  templateUrl: './add-puppil.component.html',
  styleUrls: ['./add-puppil.component.css']
})
export class AddPuppilComponent implements OnInit {

  classroomId!: string;
  email!: string;

  constructor(private classroomService: ClassroomService) {}
  ngOnInit(): void {
  }

  addPupilToClassroom() {
    this.classroomService.addPupilToClassroom(this.classroomId, this.email).subscribe(
      response => {
        console.log('Pupil added successfully', response);
        // Handle success (e.g., display a success message)
      },
      error => {
        console.error('Error adding pupil', error);
        // Handle error (e.g., display an error message)
      }
    );
  }

}
