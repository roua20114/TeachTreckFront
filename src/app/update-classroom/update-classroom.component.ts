import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from '../Service/classroom.service';
import { Classroom } from '../Models/classroom';
import { AuthService } from '../Service/auth.service';
import { User } from '../Models/user';

@Component({
  selector: 'app-update-classroom',
  templateUrl: './update-classroom.component.html',
  styleUrls: ['./update-classroom.component.css']
})
export class UpdateClassroomComponent implements OnInit {

  classroomId!: string;
  name!: string;
  userId:any;
  currentUser:User|null=null;

  constructor(
    private route: ActivatedRoute,
    private classroomService: ClassroomService,
    private router: Router,
    private authenticationService: AuthService
  ) {this.authenticationService.currentUser.subscribe(x => this.currentUser = x);}

  ngOnInit(): void {
    this.userId = this.authenticationService.getCurrentUserId();
    this.classroomId = this.route.snapshot.paramMap.get('id')!;
  }

  saveClassroomName(): void {
    if (this.name) {
      this.classroomService.editClassroomName(this.classroomId, this.name)
        .subscribe(
          response => {
            console.log('Classroom name updated successfully', response);
            this.router.navigate(['/allClassroom']); // Navigate to classroom list or another route after saving
          },
          error => {
            console.error('Error updating classroom name', error);
          }
        );
    }
  }

}
