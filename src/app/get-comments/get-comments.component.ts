import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../Service/classroom.service';

@Component({
  selector: 'app-get-comments',
  templateUrl: './get-comments.component.html',
  styleUrls: ['./get-comments.component.css']
})
export class GetCommentsComponent implements OnInit {
  postId!: string;
  comments: Comment[] = [];

  constructor(private classroomService: ClassroomService) {}

  ngOnInit() {
    this.getComments();
  }

  getComments() {
    this.classroomService.getCommentsForPost(this.postId).subscribe(
      response => {
        this.comments= response;
      },
      error => {
        console.error('Error fetching comments', error);
      }
    );
  }

}
