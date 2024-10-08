import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Courses } from 'src/app/Models/courses';
import { CourseService } from 'src/app/Service/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course: Courses | undefined;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    this.courseService.getCourseById(courseId!).subscribe((data: Courses) => {
      this.course = data;
    });
  }

}
