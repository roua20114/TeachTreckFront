import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Classroom } from 'src/app/Models/classroom';
import { Courses } from 'src/app/Models/courses';
import { ClassroomService } from 'src/app/Service/classroom.service';
import { CourseService } from 'src/app/Service/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {

 

  courseForm!: FormGroup;
  selectedFile: File | null = null;
  courseId!: string;
  classroomId: any;

  constructor( private router:Router, private route: ActivatedRoute, private fb:FormBuilder,private courseService: CourseService) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      courseType: ['', Validators.required]
    });
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
  }
   
  
  ngOnInit(): void {
    this.classroomId=this.route.snapshot.paramMap.get('classroomId')
    const courseId = this.route.snapshot.paramMap.get('courseId');
    this.loadCourseDetails();
    
  }
  loadCourseDetails(): void {
    this.courseService.getCourseById(this.courseId).subscribe(course => {
      this.courseForm.patchValue({
        title: course.title,
        description: course.description,
        courseType: course.courseType
      });
    });
  }
  

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Submit the form to update the course
  onUpdateCourse(): void {
    const formData = new FormData();
    formData.append('title', this.courseForm.get('title')?.value);
    formData.append('description', this.courseForm.get('description')?.value);
    formData.append('courseType', this.courseForm.get('courseType')?.value);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.courseService.updateCourse(this.courseId, formData).subscribe(response => {
      console.log('Course updated successfully', response);
      Swal.fire('Success','Course Updated Successfully','success')
      this.router.navigate(['/classroomWall',this.classroomId]);
    }, error => {
      console.error('Error updating course', error);
    });
  }
}


