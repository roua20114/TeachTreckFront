import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Classroom } from 'src/app/Models/classroom';
import { Comment } from 'src/app/Models/comment';

import { Courses } from 'src/app/Models/courses';
import { Post } from 'src/app/Models/post';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Service/auth.service';
import { ClassroomService } from 'src/app/Service/classroom.service';
import { CourseService } from 'src/app/Service/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classroom-wall',
  templateUrl: './classroom-wall.component.html',
  styleUrls: ['./classroom-wall.component.css']
})
export class ClassroomWallComponent implements OnInit {
  classroomId: any;
  classroom!: Classroom;
  post!: FormGroup;
  // comments:any ;
  course!:Courses[];
  courses: Courses[] = [];
  courseForm!: FormGroup;
  selectedFile!: File;
  id!: string;
  teacher: any;
  title: string = '';
  description: string = '';
  courseType: string = '';
  currentUser!:  any ;
  menuVisible!: boolean;
  fileUrl: string | null = null;
  posts: Post[] = [];
  teacherId:any;
  content: string = '';
  commentForm!: FormGroup;
  postId:any;
  activeCommentPostId: string | null = null; 
 
 
  userId:any;
  newComment = { content: '' };
  newPost = { content: '' };

  constructor(
    private route: ActivatedRoute,
    private classroomService: ClassroomService,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private authenticationService: AuthService,
    
    private router: Router, 
  ) { 
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required],
      
      
   
      // Set the student ID here if applicable
    });
  }

  ngOnInit(): void {
    this.classroomId = this.route.snapshot.paramMap.get('id'); 
    this.postId = this.route.snapshot.paramMap.get('id');
    this.userId = this.authenticationService.getCurrentUserId();
 
    console.log(this.postId);
    // Assuming 'id' is the parameter name in the route
    if (this.classroomId) {
      console.log('Setting classroomId:', this.classroomId); // Log the ID being set
      this.classroomService.setClassroomId(this.classroomId);
      this.getClassroomDetails();
      this.getCourses();
    } else {
      console.error('Classroom ID not found in route');
    }
    

    this.courseService.getMyCourses(this.classroomId)
    this.classroomService.getByIdClassroom(this.id);
    this.courseForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      courseType: ['', Validators.required],
      filePath: ['', Validators.required],
    });
    this.post = this.formBuilder.group({
      content: ['', Validators.required]  // Add other form controls as needed
    });   
    this.loadPosts();
   
    
  }
  
  submitComment(postId: string): void {
    const commentData = {
      content: this.newComment.content,
    };
    if (this.commentForm.valid) {
      const commentData = this.commentForm.value;
      this.classroomService.addComment(postId,this.userId, commentData.content).subscribe(() => {
        // Reload comments for the specific post
        this.classroomService.getComments(postId).subscribe(
          (commentsResponse: Comment[]) => {
            const post = this.posts.find(p => p.id === postId);
            if (post) {
              post.comments = commentsResponse;
            }
          },
          error => console.error('Error reloading comments', error)
        );
        this.commentForm.reset();
      });
    }
  }
  loadPosts(): void {
    this.classroomService.getPostsByClassroom(this.classroomId).subscribe((data: Post[]) => {
      this.posts = data;
      this.posts.forEach(post => {
        this.classroomService.getComments(post.id).subscribe(
            (commentsResponse: any) => {
                post.comments = commentsResponse // Store comments directly in the post object
            },
            error => {
                console.error('Error fetching comments', error);
            }
          );
      });
    });
  }

  
  
  getClassroomDetails(): void {
    this.classroomService.getByIdClassroom(this.classroomId)
      .subscribe(
        (data: Classroom) => {
          this.classroom = data;
        },
        error => {
          console.error('Error fetching classroom details', error);
          // Handle error scenario as needed
        }
      );
  }
  getCourses(): void {
    this.courseService.getMyCourses(this.classroomId).subscribe(
      (data: Courses[]) => {
        if (data && data.length > 0) {
          this.courses = data;  // Assign to the 'courses' array
          console.log('Courses fetched successfully:', data);  // Debugging log
        } else {
          console.log('No courses found for this classroom.');
        }
      },
      (error) => {
        console.error('An error occurred while fetching courses:', error);
      }
    );
  }
  onSubmit(): void {
  
    const postData = {
      content: this.newPost.content
    };
    if (this.post.valid) {
    // Now you can process the form submission
    const postData = this.post.value;
    this.classroomService
      .createPost(this.classroomId,this.userId, postData.content)
      .subscribe(
        (response: any) => {
          console.log('Post added successfully', response);
          Swal.fire('Success', 'Post added successfully', 'success').then(() => {
           
            window.location.reload();
           
          });
         
        },
        (error: any) => {
          console.error('Error adding course', error);
        }
      );
  }
}
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }


  // Handle form submission
  onSubmitt(): void {
    if (this.courseForm.invalid || !this.selectedFile) {
      console.error('Form is invalid or no file selected');
      return;
    }

    // Extract form values
    const { title, description, courseType } = this.courseForm.value;

    if (!this.classroomId) {
      console.error('No classroom selected');
      return;
    }

    // Call the service to add the course with the file
    this.courseService
      .addCourse(this.selectedFile, title, description, courseType, this.classroomId)
      .subscribe(
        (response: any) => {
          console.log('Course added successfully', response);
          Swal.fire('Success', 'Course added successfully', 'success');
          this.router.navigate(['/classroomWall', this.classroomId])
        },
        (error: any) => {
          console.error('Error adding course', error);
        }
      );
  }
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
  downloadFile(): void {
    if (this.fileUrl) {
      const link = document.createElement('a');
      link.href = this.fileUrl;
      link.download = this.fileUrl.split('/').pop() || 'file';
      link.click();
    }
  }
 

  // Copy the course link to clipboard
  
  getFileUrl(filePath: string): string {
    return filePath ? `http://localhost:8081/folder/files/${filePath}` : '#';
  }

  // Extract the file name from the file path
  getFileName(filePath: string): string {
    if (filePath) {
      return filePath.split('/').pop() || 'Download File';
    }
    return 'Download File';
  }
  deleteCourse(courseId:string){
    this.courseService.deleteCourse(courseId!).subscribe(() => {
      window.location.reload();
  });
}
  

   
  

}
