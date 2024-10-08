import { Component, OnInit } from '@angular/core';
import { ClassroomService } from 'src/app/Service/classroom.service';

@Component({
  selector: 'app-archive-classroom',
  templateUrl: './archive-classroom.component.html',
  styleUrls: ['./archive-classroom.component.css']
})
export class ArchiveClassroomComponent implements OnInit {

  classroomId!: string;

  constructor(private classroomService: ClassroomService) {}
  ngOnInit(): void {
   
  }

  archiveClassroom() {
    this.classroomService.archiveClassroom(this.classroomId).subscribe(
      response => {
        console.log(response);
        // Handle success (e.g., display a success message)
      },
      error => {
        console.error('Error archiving classroom', error);
        // Handle error (e.g., display an error message)
      }
    );
  }
}
