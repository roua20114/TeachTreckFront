import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AccueilComponent } from './accueil/accueil/accueil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { StudentComponent } from './student/student/student.component';
import { AdminComponent } from './admin/admin/admin.component';
import { TeacherComponent } from './teacher/teacher/teacher.component';
import { JwtInterceptor } from './guards/jwt.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoursesComponent } from './courses/courses/courses.component';
import { ClassroomComponent } from './classroom/classroom.component';

@NgModule({
  declarations: [
    AppComponent,
    
    AccueilComponent,
         LoginComponent,
         RegisterComponent,
         StudentComponent,
         AdminComponent,
         TeacherComponent,
         CoursesComponent,
         ClassroomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  
    FormsModule  
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
