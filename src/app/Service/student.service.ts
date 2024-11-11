import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Classroom } from '../Models/classroom';
import { Post } from '../Models/post';
import { Courses } from '../Models/courses';
import { Exam } from '../Models/exam';
import { Answer } from '../Models/answer';
import { JoinRequest } from '../Models/join-request';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:8081/api/student';
  private apiUrl2= 'http://localhost:8081/join-requests';
  private apiUrl3 = 'http://localhost:8081/private/post';
  private apiUrl4 = 'http://localhost:8081/api/exams';
  private apiUrl5 = 'http://localhost:8081/api/answers';
  private url5='http://localhost:8081/api/answers';

  private currentClassroomId: string | null = null;
  constructor(private http: HttpClient) { }

  createPupil(email: string, name: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}?email=${email}&name=${name}`, {});
  }
  sendJoinRequest(classroomId: string, studentId: string): Observable<any> {
    return this.http.post(`${this.apiUrl2}/send?classroomId=${classroomId}&studentId=${studentId}`, {});
  }
  requestToJoinClassroom(studentId: string, classroomId: string): Observable<JoinRequest> {
    return this.http.post<JoinRequest>(`${this.apiUrl2}/request`, { studentId, classroomId });
  }
  createJoinRequest(classroomId: string, student: any): Observable<any> {
    return this.http.post(`${this.apiUrl2}/send?classroomId=${classroomId}`, student);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMsg = `Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMsg = `Error: ${error.status} - ${error.message}`;
    }
    return throwError(errorMsg);
  }
  // getApprovedClassrooms(studentId: number): Observable<Classroom[]> {
  //   return this.http.get<Classroom[]>(`${this.apiUrl}/approved/${studentId}`);
  // }
  // getJoinedClassrooms(studentId: string): Observable<Classroom[]> {
  //   return this.http.get<Classroom[]>(`${this.apiUrl}/joined/${studentId}`);
  // }

  getPendingRequests(classroomId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl2}/classroom/${classroomId}/pending`);
  }

  updateRequestStatus(requestId: string, status: string): Observable<any> {
    return this.http.post(`${this.apiUrl2}/${requestId}/status?status=${status}`, {});
  }

  getApprovedClassrooms(studentId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl2}/student/${studentId}/approved`);
  }



  getStudentsInClassroom(classroomId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${classroomId}/studentlist`);
  }
  createPost(classroomId: any, content: any): Observable<any> {
   
    return this.http.post<any>(`${this.apiUrl3}/${classroomId}/post`,null, {
      params: { content }});
  }
  setClassroomId(classroomId: string): void {
    console.log('Setting classroomId:', classroomId); 
    this.currentClassroomId = classroomId;
  }
  getByIdClassroom(classroomId: string): Observable<Classroom> {
    return this.http.get<Classroom>(`${this.apiUrl}/${classroomId}`);
  }
  addComment(postId: string, commentData: any): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl3}/${postId}/comment`, commentData);
  }

  // Method to get comments for a post
  getComments(postId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl3}/${postId}/commets`);
  }
  getPostsByClassroom(classroomId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl3}/${classroomId}/posts`);
  }
  getCoursesByClassroomId(classroomId: string): Observable<Courses[]> {
    return this.http.get<Courses[]>(`${this.apiUrl}/classroom/${classroomId}`);
  }
  getExamsByClassroomId(classroomId: string): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${this.apiUrl}/exams/${classroomId}`);
  }
  // submitAnswers(answers: Answer[]): Observable<any> {
  //   return this.http.post(`${this.apiUrl5}/submit`, answers);
  // }

  // Get submitted answers for an exam
  getAnswersByExamId(examId: string): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.apiUrl5}/exam/${examId}`);
  }
  getExamsByClassroom(classroomId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/allexams/${classroomId}`);
  }
  getExamQuestions(examId: string): Observable<any> {
    return this.http.get(`${this.url5}/${examId}/questions`);
  }

  // Submit student answers
  submitAnswers(examId: string, user_responses  : { [key: string]: string }): Observable<any> {
    const requestBody = {
      examId: examId,
      user_responses: user_responses  
    };
    return this.http.post<any>(`${this.url5}/submit_answers`, requestBody);
  }

  // Fetch answers for a specific exam (teacher evaluation)

  evaluateExam(userResponses: Record<string, string>, examId: string, userId:any): Observable<any> {
    const requestBody = {
      userResponses: userResponses,
      examId: examId,
      userId: userId 
    };

    return this.http.post(`${this.url5}/evaluate`, requestBody);
  }

  
 
}
