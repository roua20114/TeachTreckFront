import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Courses } from 'src/app/Models/courses';
import { CourseService } from 'src/app/Service/course.service';


@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  courses: Courses[] = [];
 
  classroomId: string | null = ''

  constructor(private courseService: CourseService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.classroomId = this.route.snapshot.paramMap.get('classroomId');
    if (this.classroomId) {
      this.courseService.getMyCourses(this.classroomId).subscribe({
        next: (courses) => this.courses = courses,
        error: (err) => console.error('Error fetching courses', err)
      });
    } else {
      console.error('Classroom ID is required');
    }
  }
}
