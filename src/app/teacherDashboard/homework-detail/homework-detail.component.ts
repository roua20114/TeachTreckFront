import { Component, OnInit } from '@angular/core';
import { Homework } from 'src/app/Models/homework';
import { ClassroomService } from 'src/app/Service/classroom.service';


@Component({
  selector: 'app-homework-detail',
  templateUrl: './homework-detail.component.html',
  styleUrls: ['./homework-detail.component.css']
})
export class HomeworkDetailComponent implements OnInit {

  homeworkId!: string;
  homework!: Homework;

  constructor(private classroomService: ClassroomService) {}

  ngOnInit() {
    this.getHomeworkDetail();
  }

  getHomeworkDetail() {
    this.classroomService.getHomeworkDetail(this.homeworkId).subscribe(
      response => {
        this.homework = response;
      },
      error => {
        console.error('Error fetching homework detail', error);
      }
    );
  }

}
