import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user';
import { Exam } from '../Models/exam';
import { JoinRequest } from '../Models/join-request';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl = 'http://localhost:8081/teacher-actions';
  private url='http://localhost:8081/join-requests'
  private url2='http://localhost:8081/user-actions'
  private url3='http://localhost:8081/api/exams'
  private url4='http://localhost:8081/exams'
  private url5='http://localhost:8081/api/answers';

  constructor(private http: HttpClient) { }

  uploadProfilePicture(teacherId: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(`${this.apiUrl}/${teacherId}/uploadProfilePicture`, formData, { headers });
  }
  getJoinRequestsByClassroom(classroomId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/classroom/${classroomId}`);
  }
  approveJoinRequest(requestId: string): Observable<JoinRequest> {
    return this.http.put<JoinRequest>(`${this.apiUrl}/approve/${requestId}`, {});
  }
  getPendingRequests(classroomId: string): Observable<JoinRequest[]> {
    return this.http.get<JoinRequest[]>(`${this.apiUrl}/pending/${classroomId}`);
  }
  getJoinRequests(classroomId: string): Observable<any> {
    return this.http.get(`${this.url}/classroom/${classroomId}`);
  }
  approveRequest(requestId: string): Observable<any> {
    return this.http.put(`${this.url}/approve/${requestId}`, {});
  }

  rejectRequest(requestId: string): Observable<any> {
    return this.http.put(`${this.url}/reject/${requestId}`, {});
  }

  rejectJoinRequest(requestId: string): Observable<JoinRequest> {
    return this.http.put<JoinRequest>(`${this.apiUrl}/reject/${requestId}`, {});
  }
  getTeacherProfile(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/api/teacher/${id}`);
  }
  getTeacherProfilePicture(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/profile-picture/${id}`, { responseType: 'blob' });
  }
  // updateProfile(id:any,formData: FormData): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/${id}/updateProfile`, formData, {
  //     headers: new HttpHeaders({
  //       'enctype': 'multipart/form-data',
  //     }),
  //   });
  // }
  updateUserProfile(id: string, updatedUser: User, profilePicture: File): Observable<User> {
    const formData: FormData = new FormData();
    formData.append('profilePicture', profilePicture);
    formData.append('updatedUser', new Blob([JSON.stringify(updatedUser)], { type: 'application/json' }));

    return this.http.put<User>(`${this.url2}/updateprofile/${id}`, formData);
  }
  getUserById(id: any): Observable<User> {
    return this.http.get<User>(`${this.url2}/${id}`);
  }
  getUserProfile(id: string): Observable<User> {
    return this.http.get<User>(`${this.url2}/profile/${id}`);
  }
  deleteUserProfile(id: string): Observable<any> {
    return this.http.delete(`${this.url2}/profiledelete/${id}`);
  }
  // createExam(exam: Exam): Observable<Exam> {
  //   return this.http.post<Exam>(`${this.url2}/create`, exam);
  // }

  getExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(this.url3);
  }

  getExam(id: string): Observable<Exam> {
    return this.http.get<Exam>(`${this.url3}/${id}`);
  }

  deleteExam(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url3}/${id}`);
  }
  addExamToClassroom(classroomId: any, examData: any): Observable<Exam> {
    return this.http.post<Exam>(`${this.url3}/add-to-classroom/${classroomId}`, examData);
  }
  getExamById(examId: string): Observable<any> {
    return this.http.get(`${this.url3}/${examId}`);
  }
  evaluateExam(examId: string, studentResponses: any): Observable<any> {
    return this.http.post(`${this.url3}/evaluate/${examId}`, studentResponses);
  }



  createExam(examData, classroomId:string): Observable<any> {
    return this.http.post(`${this.url3}/create/${classroomId}`, examData);
  }

  getExamsByClassroom(classroomId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/allexamst/${classroomId}`);
  }

  

}
