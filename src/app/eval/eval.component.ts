import { Component, OnInit } from '@angular/core';
import { Exam } from '../Models/exam';
import { ActivatedRoute } from '@angular/router';
import { ClassroomService } from '../Service/classroom.service';
import { Classroom } from '../Models/classroom';
import { StudentService } from '../Service/student.service';

@Component({
  selector: 'app-eval',
  templateUrl: './eval.component.html',
  styleUrls: ['./eval.component.css']
})
export class EvalComponent implements OnInit {
  classroomId: any;
  exams: Exam[] = [];
  examId:any;
  classroom!:Classroom;

  constructor(private classroomService: ClassroomService, private route: ActivatedRoute, private studentService:StudentService) { }

  ngOnInit(): void {
    this.classroomId = this.route.snapshot.paramMap.get('classroomId');
    this.examId=this.route.snapshot.paramMap.get('examId');
    
   
      this.studentService.getExamsByClassroom(this.classroomId).subscribe(
        (response: any) => {
          this.exams = response;
        },
        (error: any) => {
          console.error('Error fetching exams', error);
        }
      );
    
  }
  

}
