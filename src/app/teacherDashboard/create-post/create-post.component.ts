import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/Models/post';
import { ClassroomService } from 'src/app/Service/classroom.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  classroomId!: string;
  content!: string;
  post!: Post;

  constructor(private classroomService: ClassroomService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // createPost() {
  //   this.classroomService.createPost(this.classroomId, this.content).subscribe(
  //     response => {
  //       this.post = response;
  //       // Handle success (e.g., display a success message, clear the form)
  //     },
  //     error => {
  //       console.error('Error creating post', error);
  //       // Handle error (e.g., display an error message)
  //     }
  //   );
  // }

}
