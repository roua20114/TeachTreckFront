import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  private apiUrl = 'http://localhost:8080/api/classroom';

  constructor(private http: HttpClient) { }

  createClassroom(name: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}?name=${name}`, {});
  }

  addPupilToClassroom(code: string, email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${code}/pupils?email=${email}`, {});
  }

 
}
