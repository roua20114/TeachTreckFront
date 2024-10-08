import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccueilComponent } from './accueil/accueil/accueil.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { StudentComponent } from './student/student/student.component';
;





import { GetCommentsComponent } from './get-comments/get-comments.component';
import { TeacherComponent } from './teacherDashboard/teacher/teacher.component';
import { AddCommentComponent } from './teacherDashboard/add-comment/add-comment.component';
import { AddPuppilComponent } from './teacherDashboard/add-puppil/add-puppil.component';
import { ArchiveClassroomComponent } from './teacherDashboard/archive-classroom/archive-classroom.component';
import { ClassroomCardComponent } from './teacherDashboard/classroom-card/classroom-card.component';
import { ClassroomComponent } from './teacherDashboard/classroom/classroom.component';
import { CourseDetailComponent } from './teacherDashboard/course-detail/course-detail.component';
import { CreatePostComponent } from './teacherDashboard/create-post/create-post.component';
import { DeleteCourseComponent } from './teacherDashboard/delete-course/delete-course.component';
import { HomeworkDetailComponent } from './teacherDashboard/homework-detail/homework-detail.component';
import { MyCoursesComponent } from './teacherDashboard/my-courses/my-courses.component';
import { ScheduleHomeworkComponent } from './teacherDashboard/schedule-homework/schedule-homework.component';
import { UpdateCourseComponent } from './teacherDashboard/update-course/update-course.component';
import { GetHomeworksComponent } from './teacherDashboard/get-homeworks/get-homeworks.component';
import { ClassroomWallComponent } from './teacherDashboard/classroom-wall/classroom-wall.component';
import { ProfilTeacherComponent } from './profil-teacher/profil-teacher.component';
import { PeopleComponent } from './people/people.component';
import { InviteStudentsComponent } from './invite-students/invite-students.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { UpdateClassroomComponent } from './update-classroom/update-classroom.component';
import { JoinRequestsComponent } from './join-requests/join-requests.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { JoinedClassroomsComponent } from './joined-classrooms/joined-classrooms.component';
import { AddExamComponent } from './add-exam/add-exam.component';
import { EvalComponent } from './eval/eval.component';
import { ExamDetailComponent } from './exam-detail/exam-detail.component';
import { JoinedClassListComponent } from './joined-class-list/joined-class-list.component';
import { ClassroomWallStudentComponent } from './classroom-wall-student/classroom-wall-student.component';
import { PeopleListStudntComponent } from './people-list-studnt/people-list-studnt.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { ExamStudentListComponent } from './exam-student-list/exam-student-list.component';
import { AnswerStudentComponent } from './answer-student/answer-student.component';




const routes: Routes = [
      {path:'',redirectTo:'accueil',pathMatch:'full'},
      {path:"accueil", component:AccueilComponent},
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { expectedRole: ['ADMIN','TEACHER'] } },
      {path: 'teacher', component: TeacherComponent, canActivate: [AuthGuard],data: { expectedRole: ['TEACHER'] }},
      { path: 'classroom', component: ClassroomComponent, canActivate: [AuthGuard],data: { expectedRole: ['TEACHER'] }},
      { path:'addStudents', component:AddPuppilComponent, canActivate: [AuthGuard],data: { expectedRole: ['TEACHER'] }},
      { path:'allClassroom', component:ClassroomCardComponent, canActivate: [AuthGuard],data: { expectedRole: ['TEACHER'] }},
      { path: 'my-classrooms', component: ClassroomComponent, canActivate: [AuthGuard],data: { expectedRole: ['TEACHER'] } },
      { path: 'classroom/:id/archive', component: ArchiveClassroomComponent, canActivate: [AuthGuard],data: { expectedRole: ['TEACHER'] } },
      { path: 'classroom/:id/post', component: CreatePostComponent, canActivate: [AuthGuard],data: { expectedRole: ['TEACHER'] } },
      { path: 'classroom/:id/schedule-homework', component: ScheduleHomeworkComponent, canActivate: [AuthGuard],data: { expectedRole: ['TEACHER'] } },
      { path: 'classroom/:id/homeworks', component: GetHomeworksComponent, canActivate: [AuthGuard],data: { expectedRole: ['TEACHER'] } },
      { path: 'homework/:homeworkId', component: HomeworkDetailComponent, canActivate: [AuthGuard],data: { expectedRole: ['TEACHER'] } },
      { path: 'post/:postId/comment', component: AddCommentComponent, canActivate: [AuthGuard],data: { expectedRole: ['TEACHER'] } },
      { path: 'post/:postId/comments', component: GetCommentsComponent, canActivate: [AuthGuard],data: { expectedRole: ['TEACHER'] } },
      { path: 'my-courses', component: MyCoursesComponent , canActivate: [AuthGuard],data: { expectedRole: ['TEACHER'] }},
      { path: 'classroom/:classroomId/course/:courseId/edit', component: UpdateCourseComponent, canActivate: [AuthGuard],data: { expectedRole: ['TEACHER'] } },
      { path: 'course-detail/:courseId', component: CourseDetailComponent , canActivate: [AuthGuard],data: { expectedRole: ['TEACHER'] }},
      { path: 'delete-course/:courseId', component: DeleteCourseComponent , canActivate: [AuthGuard],data: { expectedRole: ['TEACHER'] }},
      { path: 'classroomWall/:id', component: ClassroomWallComponent, canActivate: [AuthGuard],data: { expectedRole: ['TEACHER'] }},
      { path:  'invitation/:classroomId', component:InviteStudentsComponent, canActivate: [AuthGuard],data: { expectedRole: ['TEACHER'] }},
      { path:  'profile/:id',component:ProfilTeacherComponent},
      { path:  'people/:classroomId',component:PeopleComponent, canActivate: [AuthGuard],data: { expectedRole: ['TEACHER'] }},
      { path: 'update/:id',component:UpdateClassroomComponent, canActivate: [AuthGuard],data: { expectedRole: ['TEACHER'] }},
      { path: 'joinrequest/:classroomId',component:JoinRequestsComponent, canActivate: [AuthGuard],data: { expectedRole: ['TEACHER'] }},
      { path: 'joinedclass/:studentId',component: JoinedClassroomsComponent, canActivate: [AuthGuard],data: { expectedRole: ['STUDENT'] }},
      { path: 'exams/:classroomId', component: AddExamComponent },
      { path: 'allexams/:classroomId',component:EvalComponent},
      { path: 'exam/:examId', component: ExamDetailComponent },
      { path: 'classrooms/joined/:studentId', component: JoinedClassListComponent },
      { path: 'classroomstudent/:classroomId', component: ClassroomWallStudentComponent},
      { path: 'peoplelist/:classroomId', component:PeopleListStudntComponent},
      { path:'profilestudent/:id' , component:ProfileStudentComponent},

     


      { path: 'student',component: StudentHomeComponent, canActivate: [AuthGuard],data: { expectedRole: ['STUDENT'] }},
      { path: 'update-profile/:id', component: UpdateProfileComponent },
      { path: 'student/classroom/:classroomId/exams',component: ExamStudentListComponent},
      {path: 'student/submit-answers/:examId',component: AnswerStudentComponent},
      
 
 
      { path: 'pupil', component: StudentComponent },
 
  
 
  
 
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
