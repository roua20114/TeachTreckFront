import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selectedIndex:any=0;
  activeLinkIndex = -1; 
  activeTab = 'STUDENT';
  submitted = false;
  submitted2 = false;

  error = '';
  loading=false
  registerFormStudent!: FormGroup;
  registerFormTeacher!: FormGroup;

  data:any={}
  search(activeTab: string, $event: MouseEvent): void{
    $event.preventDefault();
    this.activeTab = activeTab;
  }

  result(activeTab: string, $event: MouseEvent): void{
    $event.preventDefault();
    this.activeTab = activeTab;
  }
  constructor(private formBuilder: FormBuilder,private authService: AuthService, private router: Router) { }

  

  ngOnInit(): void {
    this.registerFormStudent = this.formBuilder.group({
      username: ['', Validators.required],
      email:  ['', Validators.required],
      password:['', Validators.required], 
      mobile: ['', Validators.required],
      address:  ['', Validators.required],
      university: ['', Validators.required ], 
      gender: ['', Validators.required],
      studyField: ['', Validators.required],              
  });
  this.registerFormTeacher= this.formBuilder.group({
    username: ['', Validators.required],
    email:  ['', Validators.required],
    password:['', Validators.required], 
    mobile: ['', Validators.required],
    address:  ['', Validators.required],
    university: ['', Validators.required ], 
    gender: ['', Validators.required],
    domain: ['', Validators.required],
    department:  ['', Validators.required],
  });
}
resetTabIndex() {
  this.selectedIndex = 0;
  console.log('tab index has been reset');
}
get f() { return this.registerFormStudent.controls; }
get g() { return this.registerFormTeacher.controls; }



onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.registerFormStudent.invalid) {
      return;
  }
  this.loading = true;
  this.data=this.registerFormStudent.getRawValue()
  
  this.data.role=this.activeTab
  this.authService.register(this.data)
      .subscribe(
          data => {
            Swal.fire('Registred', 'success') 

              this.router.navigate(["/login"]);
          },
          error => {
              this.error = error;
              console.log(error);
              
              this.loading = false;
          });
}
onSubmitTeacher(){
this.submitted2 = true;

  // stop here if form is invalid
  if (this.registerFormTeacher.invalid) {
      return;
  }
  this.loading = true;
  this.data=this.registerFormTeacher.getRawValue()
  this.data.role=this.activeTab
  this.authService.register(this.data)
      .subscribe(
          data => {
            Swal.fire('Registred', 'success') 
            
            this.router.navigate(["/login"]);

          },
          error => {
              this.error = error;
              console.log(error);
              
              this.loading = false;
          });
}
  

}
