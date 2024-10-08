import { Component, Input, OnInit } from '@angular/core';
import { Exam } from '../Models/exam';
import { StudentService } from '../Service/student.service';
import { TeacherService } from '../Service/teacher.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam-student-list',
  templateUrl: './exam-student-list.component.html',
  styleUrls: ['./exam-student-list.component.css']
})
export class ExamStudentListComponent implements OnInit {
  // @Input() classroomId!: string;  // Input from parent component
  // exams: Exam[] = [];
  exams: any;
  answers = {};
  classroomId:any
  examId:any

  constructor(private studentService: StudentService, private route:ActivatedRoute) { }
 

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
    
    // if (this.classroomId) {
    //   this.studentService.getExamsByClassroomId(this.classroomId).subscribe(
    //     (data: Exam[]) => {
    //       this.exams = data;
    //     },
    //     error => {
    //       console.error('Error loading exams:', error);
    //     }
    //   );
    // }
  }
  
}
