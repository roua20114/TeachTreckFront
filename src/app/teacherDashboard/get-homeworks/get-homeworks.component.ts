import { Component, OnInit } from '@angular/core';
import { Homework } from 'src/app/Models/homework';
import { ClassroomService } from 'src/app/Service/classroom.service';


@Component({
  selector: 'app-get-homeworks',
  templateUrl: './get-homeworks.component.html',
  styleUrls: ['./get-homeworks.component.css']
})
export class GetHomeworksComponent implements OnInit {

  classroomId!: string;
  homeworks: Homework[] = [];

  constructor(private classroomService: ClassroomService) {}

  ngOnInit() {
    this.getHomeworks();
  }

  getHomeworks() {
    this.classroomService.getHomeworksForClassroom(this.classroomId).subscribe(
      response => {
        this.homeworks = response;
      },
      error => {
        console.error('Error fetching homeworks', error);
      }
    );
  }
}
