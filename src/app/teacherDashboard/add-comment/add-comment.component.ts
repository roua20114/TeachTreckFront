import { Component, OnInit } from '@angular/core';
import { ClassroomService } from 'src/app/Service/classroom.service';


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  postId!: string;
  content!: string;
  comment!: Comment;

  constructor(private classroomService: ClassroomService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // addComment() {
  //   this.classroomService.addCommentToPost(this.postId, this.content).subscribe(
  //     response => {
  //       this.comment = response;
  //       // Handle success (e.g., display a success message, clear the form)
  //     },
  //     error => {
  //       console.error('Error adding comment', error);
  //       // Handle error (e.g., display an error message)
  //     }
  //   );
  // }

}
