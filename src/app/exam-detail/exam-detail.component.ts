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
 
  exam: Exam | undefined;
  examId!: string ;  // The examId will be dynamically set
  examResponses: any[] = [];

  constructor(private teacherService: TeacherService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('examId')!;
    
   
    this.teacherService.getExamById(this.examId).subscribe(
      (data: Exam) => {
        this.exam = data;
        console.log('Exam details fetched successfully', this.exam);
      },
      (error) => {
        console.error('Error fetching exam details', error);
      }
    );
    this.teacherService.getExamResponses(this.examId).subscribe(
    
      (data) => {
        console.log("Fetched responses:",data); 
          if (data && data && Array.isArray(data)) {
           
              // Make sure that responses exist and are properly assigned
              this.examResponses = data;
              console.log('Fetched responses:', this.examResponses);  // Log responses to verify
          } 
      },
      (error) => {
          console.error('Error fetching responses', error);
          this.examResponses = [];  // Handle error case
      }
  );
  }
 
  getKeys(obj: any): string[] {
    return Object.keys(obj);
}
  

}
