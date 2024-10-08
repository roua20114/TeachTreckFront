import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../Service/teacher.service';

@Component({
  selector: 'app-exam-evaluate',
  templateUrl: './exam-evaluate.component.html',
  styleUrls: ['./exam-evaluate.component.css']
})
export class ExamEvaluateComponent implements OnInit {
examId!: string;

  constructor(private teacherService:TeacherService) { }

  ngOnInit(): void {
  }
  // evaluateExam(examId: string) {
  //   this.teacherService.evaluateExam(examId).subscribe(response => {
  //     console.log('Exam evaluated', response);
  //   });
  // }

}
