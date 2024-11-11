import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Classroom } from '../Models/classroom';
import { Homework } from '../Models/homework';
import { Courses } from '../Models/courses';
import { Post } from '../Models/post';
import { Exam } from '../Models/exam';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  private apiUrl = 'http://localhost:8081/private/classroom';
  private apiUrl2='http://localhost:8081/user-actions';
  private apiUrl3='http://localhost:8081/private/post'
  private currentClassroomId: string | null = null;

  constructor(private http: HttpClient) { }
  post: any;
  newComment = { content: '' };
  userId!: string

  createClassroom(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>(`${this.apiUrl}/addClass`, classroom);
  }

  addPupilToClassroom(classroomId: string, email: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Token from localStorage (if needed)
    });
    return this.http.post<string>(`${this.apiUrl}/${classroomId}/studentss?email=${email}`,{headers} );
  }
  getStudentsInClassroom(classroomId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${classroomId}/allstudents`);
  }

  getMyClassrooms(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(`${this.apiUrl}/myclassrooms`);
  }

  archiveClassroom(classroomId: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${classroomId}/archive`, {});
  }

  createPost(classroomId: string, userId:string, content: any): Observable<any> {
   
    return this.http.post(`${this.apiUrl3}/post/${classroomId}/${userId}`,{content});
  }

  scheduleHomework(classroomId: string, title: string, description: string, dueDate: Date): Observable<Homework> {
    let params = new HttpParams()
      .set('title', title)
      .set('description', description)
      .set('dueDate', dueDate.toISOString());
    return this.http.post<Homework>(`${this.apiUrl}/${classroomId}/homework`, {}, { params });
  }

  getHomeworksForClassroom(classroomId: string): Observable<Homework[]> {
    return this.http.get<Homework[]>(`${this.apiUrl}/${classroomId}/homeworks`);
  }

  getHomeworkDetail(homeworkId: string): Observable<Homework> {
    return this.http.get<Homework>(`${this.apiUrl}/homework/${homeworkId}`);
  }

  

  getCommentsForPost(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/post/${postId}/comments`);
  }
  getByIdClassroom(classroomId: string): Observable<Classroom> {
    return this.http.get<Classroom>(`${this.apiUrl}/${classroomId}`);
  }
  addCourseWithFile(file: File, title: string, description: string, courseType: string, classroomId: string): Observable<Courses> {
    return this.getByIdClassroom(classroomId).pipe(
      switchMap((classroom: Classroom) => {
        const formData: FormData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('courseType', courseType);
        formData.append('classroomId', classroom.id);

        return this.http.post<Courses>(`${this.apiUrl}/add`, formData);
      })
    );
  }
  setClassroomId(classroomId: string): void {
    console.log('Setting classroomId:', classroomId); 
    this.currentClassroomId = classroomId;
  }

  getClassroomId(): string | null {
    return this.currentClassroomId;
  }
  deleteStudentFromClassroom(classroomId: string, email: string): Observable<string> {
    const params = new HttpParams().set('email', email);
    return this.http.delete<string>(`${this.apiUrl}/${classroomId}/students`, { params });
  }
  updateCourse(classroomId: string, courseId: string, course: Courses): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${classroomId}/courses/${courseId}`, course);
  }
  getCourse(classroomId: string, courseId: string): Observable<Courses> {
    return this.http.get<Courses>(`${this.apiUrl}/${classroomId}/courses/${courseId}`);
  }
  getAllclassrooms():Observable<Classroom[]>{
    return this.http.get<Classroom[]>(`${this.apiUrl2}/allclassrooms`);
  }
  editClassroomName(id: string, newName: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/edit-name`, { name: newName });
  }
  deleteClassroom(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/delete`);
  }
  getPostsByUserId(teacherId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl3}/user/${teacherId}/posts`);
  }
  getPostsByClassroom(classroomId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl3}/${classroomId}/posts`);
  }
  
 
  getExamsByClassroomId(classroomId: string): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${this.apiUrl}/${classroomId}/exams`);
  }
  addComment(postId: string, userId: string, content: string): Observable<any>{
   return this.http.post(`${this.apiUrl3}/add/${postId}/${userId}`, content )
    
  }
  // Method to get comments for a post
  getComments(postId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl3}/${postId}/commets`);
  }
 

 
  



 
}
