import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Courses } from '../Models/courses';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = 'http://localhost:8080/courses';

  constructor(private http: HttpClient) { }

  addCourse(course: Courses): Observable<Courses> {
    return this.http.post<Courses>(`${this.baseUrl}/add`, course);
  }

  getCourses(): Observable<Courses[]> {
    return this.http.get<Courses[]>(this.baseUrl);
  }
}
