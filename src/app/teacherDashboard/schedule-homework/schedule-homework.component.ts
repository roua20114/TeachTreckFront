import { Component, OnInit } from '@angular/core';
import { Homework } from 'src/app/Models/homework';
import { ClassroomService } from 'src/app/Service/classroom.service';


@Component({
  selector: 'app-schedule-homework',
  templateUrl: './schedule-homework.component.html',
  styleUrls: ['./schedule-homework.component.css']
})
export class ScheduleHomeworkComponent implements OnInit {

  classroomId!: string;
  title!: string;
  description!: string;
  dueDate!: string;
  homework!: Homework;

  constructor(private classroomService: ClassroomService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  scheduleHomework() {
    this.classroomService.scheduleHomework(this.classroomId, this.title, this.description, new Date(this.dueDate)).subscribe(
      response => {
        this.homework = response;
        // Handle success (e.g., display a success message, clear the form)
      },
      error => {
        console.error('Error scheduling homework', error);
        // Handle error (e.g., display an error message)
      }
    );
  }
}
