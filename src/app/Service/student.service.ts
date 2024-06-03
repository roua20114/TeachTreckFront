import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:8080/api/pupils';

  constructor(private http: HttpClient) { }

  createPupil(email: string, name: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}?email=${email}&name=${name}`, {});
  }
}
