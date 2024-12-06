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
import { JwtInterceptor } from './guards/jwt.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FooterAdminComponent } from './footer-admin/footer-admin.component';

import { CommonModule } from '@angular/common';

import { IfRolesDirective } from './if-roles.directive';


import { GetCommentsComponent } from './get-comments/get-comments.component';

import { AuthGuard } from './guards/auth.guard';
import { AddCommentComponent } from './teacherDashboard/add-comment/add-comment.component';
import { AddCourseComponent } from './teacherDashboard/add-course/add-course.component';
import { AddPuppilComponent } from './teacherDashboard/add-puppil/add-puppil.component';
import { ArchiveClassroomComponent } from './teacherDashboard/archive-classroom/archive-classroom.component';
import { ClassroomCardComponent } from './teacherDashboard/classroom-card/classroom-card.component';
import { ClassroomComponent } from './teacherDashboard/classroom/classroom.component';
import { CourseDetailComponent } from './teacherDashboard/course-detail/course-detail.component';
import { CreatePostComponent } from './teacherDashboard/create-post/create-post.component';
import { DeleteCourseComponent } from './teacherDashboard/delete-course/delete-course.component';
import { HeaderAdminComponent } from './teacherDashboard/header-admin/header-admin.component';
import { HomeworkDetailComponent } from './teacherDashboard/homework-detail/homework-detail.component';
import { MyCoursesComponent } from './teacherDashboard/my-courses/my-courses.component';
import { ScheduleHomeworkComponent } from './teacherDashboard/schedule-homework/schedule-homework.component';
import { SidebarComponent } from './teacherDashboard/sidebar/sidebar.component';
import { StudentInClassroomComponent } from './teacherDashboard/student-in-classroom/student-in-classroom.component';
import { TeacherHomeComponent } from './teacherDashboard/teacher-home/teacher-home.component';
import { TeacherComponent } from './teacherDashboard/teacher/teacher.component';
import { UpdateCourseComponent } from './teacherDashboard/update-course/update-course.component';
import { GetHomeworksComponent } from './teacherDashboard/get-homeworks/get-homeworks.component';
import { ClassroomWallComponent } from './teacherDashboard/classroom-wall/classroom-wall.component';
import { ProfilTeacherComponent } from './profil-teacher/profil-teacher.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PeopleComponent } from './people/people.component';
import { InviteStudentsComponent } from './invite-students/invite-students.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentHeaderComponent } from './student-header/student-header.component';
import { StudentFooterComponent } from './student-footer/student-footer.component';
import { UpdateClassroomComponent } from './update-classroom/update-classroom.component';
import { JoinRequestsComponent } from './join-requests/join-requests.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { EvalComponent } from './eval/eval.component';
import { JoinedClassroomsComponent } from './joined-classrooms/joined-classrooms.component';
import { AddExamComponent } from './add-exam/add-exam.component';
import { ExamDetailComponent } from './exam-detail/exam-detail.component';
import { JoinedClassListComponent } from './joined-class-list/joined-class-list.component';
import { ClassroomWallStudentComponent } from './classroom-wall-student/classroom-wall-student.component';
import { PeopleListStudntComponent } from './people-list-studnt/people-list-studnt.component';
import { StudentNavbarComponent } from './student-navbar/student-navbar.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { HeaderStudentComponent } from './header-student/header-student.component';
import { ExamStudentListComponent } from './exam-student-list/exam-student-list.component';
import { AnswerStudentComponent } from './answer-student/answer-student.component';
import { ExamEvaluateComponent } from './exam-evaluate/exam-evaluate.component';
import { StudentHeaderBarComponent } from './student-header-bar/student-header-bar.component';
import { UpdateStudentProfileComponent } from './update-student-profile/update-student-profile.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    
    AccueilComponent,
    LoginComponent,
    RegisterComponent,
    StudentComponent,
   AdminComponent,
    ClassroomComponent,
    HeaderAdminComponent,
   FooterAdminComponent,
   SidebarComponent,
   AddCourseComponent,
    TeacherHomeComponent,
    IfRolesDirective,
    AddPuppilComponent,
    ClassroomCardComponent,
    StudentInClassroomComponent,
    ArchiveClassroomComponent,
    CreatePostComponent,
    ScheduleHomeworkComponent,
    GetHomeworksComponent,
    HomeworkDetailComponent,
    AddCommentComponent,
    GetCommentsComponent,
    MyCoursesComponent,
    UpdateCourseComponent,
    CourseDetailComponent,
    DeleteCourseComponent,
    TeacherComponent,
    ClassroomWallComponent,
    ProfilTeacherComponent,
    NavbarComponent,
    PeopleComponent,
    InviteStudentsComponent,
    StudentHomeComponent,
    StudentHeaderComponent,
    StudentFooterComponent,
    UpdateClassroomComponent,
    JoinRequestsComponent,
    UpdateProfileComponent,
    EvalComponent,
    JoinedClassroomsComponent,
    AddExamComponent,
    ExamDetailComponent,
    JoinedClassListComponent,
    ClassroomWallStudentComponent,
    PeopleListStudntComponent,
    StudentNavbarComponent,
    ProfileStudentComponent,
    HeaderStudentComponent,
    ExamStudentListComponent,
    AnswerStudentComponent,
    ExamEvaluateComponent,
    StudentHeaderBarComponent,
    UpdateStudentProfileComponent,
    ChatComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
   
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
