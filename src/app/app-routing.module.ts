import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccueilComponent } from './accueil/accueil/accueil.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { TeacherComponent } from './teacher/teacher/teacher.component';
import { StudentComponent } from './student/student/student.component';
import { ClassroomComponent } from './classroom/classroom.component';


const routes: Routes = [
  {path:'',redirectTo:'accueil',pathMatch:'full'},
  {path:"accueil", component:AccueilComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { expectedRole: ['ADMIN','TEACHER'] } },
  { path: 'teacher', component: TeacherComponent, canActivate: [AuthGuard], data: { expectedRole: ['TEACHER'] } },
  { path: 'student', component: StudentComponent, canActivate: [AuthGuard], data: { expectedRole: ['STUDENT'] } },
  { path: 'classroom', component: ClassroomComponent },
  { path: 'pupil', component: StudentComponent }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
