import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Courses } from '../Models/courses';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  

  private baseUrl = 'http://localhost:8081/courses';

  constructor(private http: HttpClient) { }

  addCourse(file: File,title: string,description: string,courseType: string,classroomId: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('courseType', courseType);
    formData.append('classroomId', classroomId);

    return this.http.post<any>(`${this.baseUrl}/add`, formData);
  }

  getMyCourses(classroomId: string): Observable<Courses[]> {
    let params = new HttpParams().set('classroomId', classroomId);
    return this.http.get<Courses[]>(`${this.baseUrl}/my-courses`, { params });
  }
  updateCourse(courseId: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${courseId}`, formData);
  }
  getCourseById(courseId: string): Observable<Courses> {
    return this.http.get<Courses>(`${this.baseUrl}/${courseId}`);
  }

  deleteCourse(courseId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${courseId}`);
  }
}
