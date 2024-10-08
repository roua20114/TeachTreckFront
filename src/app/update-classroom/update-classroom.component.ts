import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from '../Service/classroom.service';
import { Classroom } from '../Models/classroom';

@Component({
  selector: 'app-update-classroom',
  templateUrl: './update-classroom.component.html',
  styleUrls: ['./update-classroom.component.css']
})
export class UpdateClassroomComponent implements OnInit {

  classroomId!: string;
  classroomName!: string;

  constructor(
    private route: ActivatedRoute,
    private classroomService: ClassroomService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.classroomId = this.route.snapshot.paramMap.get('id')!;
  }

  saveClassroomName(): void {
    if (this.classroomName) {
      this.classroomService.editClassroomName(this.classroomId, this.classroomName)
        .subscribe(
          response => {
            console.log('Classroom name updated successfully', response);
            this.router.navigate(['/allClassroom']); // Navigate to classroom list or another route after saving
          },
          error => {
            console.error('Error updating classroom name', error);
          }
        );
    }
  }

}
