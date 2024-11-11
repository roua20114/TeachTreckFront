import { Component, OnInit } from '@angular/core';
import { Classroom } from 'src/app/Models/classroom';
import { AuthService } from 'src/app/Service/auth.service';
import { ClassroomService } from 'src/app/Service/classroom.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-classroom-card',
  templateUrl: './classroom-card.component.html',
  styleUrls: ['./classroom-card.component.css']
})
export class ClassroomCardComponent implements OnInit {

  classrooms: Classroom[] = [];
  classroom: any[] = [];
  classroomId: any;
  userId:any;

  constructor(private classroomService: ClassroomService,private authenticationService:AuthService) {}

  ngOnInit() {
    this.userId = this.authenticationService.getCurrentUserId();
    this.classroomService.getMyClassrooms().subscribe(
      response => {
        this.classrooms = response;
      },
      error => {
        console.error('Error fetching classrooms', error);
      }
    );
  }
  deleteClassroom(id: string): void {
    if (confirm("Are you sure you want to delete this classroom?")) {
      this.classroomService.deleteClassroom(id).subscribe(
        () => {
          console.log('Classroom deleted successfully');
          this.classrooms = this.classroom.filter(classrooms => classrooms.id !== id); // Remove from local list
        },
        error => {
          console.error('Error deleting classroom', error);
        }
      );
    }
  }
  copyLink(courseId: string): void {
    const url = `${window.location.origin}/classroom/${this.classroomId}/course/${courseId}`;
    navigator.clipboard.writeText(url).then(
      () => Swal.fire('Success', 'Link copied to clipboard', 'success'),
      (error) => console.error('Failed to copy link', error)
    );
  }
   

}
