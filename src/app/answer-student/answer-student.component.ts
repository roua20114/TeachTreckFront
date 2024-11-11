import { Component, OnInit } from '@angular/core';
import { StudentService } from '../Service/student.service';
import { ActivatedRoute } from '@angular/router';
import { Answer } from '../Models/answer';
import { AuthService } from '../Service/auth.service';
import { User } from '../Models/user';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '../Service/teacher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-answer-student',
  templateUrl: './answer-student.component.html',
  styleUrls: ['./answer-student.component.css']
})
export class AnswerStudentComponent implements OnInit {
  studentId: string| null = null
  currentUser:  User | null = null ;
  answersForm!: FormGroup;
  examId: any;
  questionId:any
  questions: any[] = []; 
  examForm!: FormGroup; 
  userId:any
 
  id:any

 studentResponses: any={}; ; 
 answerForm!: FormGroup;
 evaluationResults: any[] = [];
 result:any;
 userResponses: Record<string, string> = {};


  constructor(private route: ActivatedRoute, private studentService: StudentService,private authService:AuthService,private fb: FormBuilder,private teacherService:TeacherService) { 
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    this.answerForm = this.fb.group({
      answers: this.fb.array([])  
    });
   }

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('examId') || '';
    // this.examForm = this.fb.group({});
    
    this.fetchExamQuestions();

  }
  fetchExamQuestions() {
    
    this.teacherService.getExamById(this.examId).subscribe((exam: any) => {
      this.questions = exam.question;
    
    });
  }
  
  submitExam() {
    const examId = this.examId;
    const userId = this.authService.getCurrentUserId()  // Replace with actual exam ID
    this.studentService.evaluateExam(this.userResponses, examId,userId).subscribe(response => {
      this.result = response;
    });
  }
  
  
  trackByQuestionId(index: number, question: any): string {
    return this.questionId;  // Return the unique question ID
  }
}
