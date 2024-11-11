import { Component, OnInit } from '@angular/core';
import { Exam } from '../Models/exam';
import { Question } from '../Models/question';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '../Service/teacher.service';
import { Classroom } from '../Models/classroom';
import { ClassroomService } from '../Service/classroom.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {

  classroomId:any;
  exam = { title: '', description: '', domaine: ''};


  constructor( private examService: TeacherService, private route:ActivatedRoute,private router: Router,) {
    
  }

  ngOnInit(): void {
    this.classroomId = this.route.snapshot.paramMap.get('classroomId');
  
    
  }

 
  createExam() {
    this.examService.createExam(this.exam,this.classroomId).subscribe(response => {
      console.log('Exam created:', response);
      Swal.fire('Success','Exam added successfully','success')
      this.router.navigate(['/classroomWall',this.classroomId])
    });
  }


 
}
