import { Component, OnInit } from '@angular/core';
import { Exam } from '../Models/exam';
import { TeacherService } from '../Service/teacher.service';
import { ActivatedRoute } from '@angular/router';
import { ClassroomService } from '../Service/classroom.service';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.css']
})
export class ExamDetailComponent implements OnInit {
  examId!: string;
  exam: Exam | undefined;

  constructor(private examService: TeacherService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('examId')!;
    
    // Fetch the exam details using the service
    this.examService.getExamById(this.examId).subscribe(
      (data: Exam) => {
        this.exam = data;
        console.log('Exam details fetched successfully', this.exam);
      },
      (error) => {
        console.error('Error fetching exam details', error);
      }
    );
  }
  

}
