import { Component, OnInit } from '@angular/core';
import { Courses } from 'src/app/Models/courses';
import { CourseService } from 'src/app/Service/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  course: Courses = new Courses();

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
   
    
  }
  onSubmit() {
    this.courseService.addCourse(this.course).subscribe();
  }

}
