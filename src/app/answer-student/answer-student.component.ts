import { Component, OnInit } from '@angular/core';
import { StudentService } from '../Service/student.service';
import { ActivatedRoute } from '@angular/router';
import { Answer } from '../Models/answer';
import { AuthService } from '../Service/auth.service';
import { User } from '../Models/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  // user_responses = {}// List of questions (fetched from the backend)
  user_responses = {}; 
  id:any
 // Will hold the questions fetched from the backend
 studentResponses: any={}; ; 


  constructor(private route: ActivatedRoute, private studentService: StudentService,private authService:AuthService,private fb: FormBuilder,private teacherService:TeacherService) { 
    this.authService.currentUser.subscribe(x => this.currentUser = x);}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('examId') || '';
    this.examForm = this.fb.group({});
    this.fetchExamQuestions();

  }
  fetchExamQuestions() {
    // Fetch the exam questions for the student
    this.teacherService.getExamById(this.examId).subscribe((exam: any) => {
      this.questions = exam.question;
      this.questions.forEach(question => {
        this.examForm.addControl(this.questionId, new FormControl('', Validators.required));
      });
    });
  }
  submitResponses() {
    // Prepare the student responses as { questionId: answer }
    this.teacherService.evaluateExam(this.examId, this.studentResponses).subscribe((result: any) => {
      console.log('Evaluation Result:', result);
      let totalScore = 0;
      result.forEach((evaluation: any) => {
        totalScore += evaluation.score;
      });
      Swal.fire('Evaluation Completed', `Your total score is: ${totalScore}`, 'success');
    });
  }
  trackByQuestionId(index: number, question: any): string {
    return this.questionId;  // Return the unique question ID
  }
}
