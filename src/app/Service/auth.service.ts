import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private baseUrl = 'http://localhost:8081/public/authentication-resources';
  private tokenKey = 'jwtToken';

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any{
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password })
      .pipe(map(response => {
        if (response && response.data) {
          // Store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(response.data));
          localStorage.setItem('token', response.data.token);
          
          // Notify subscribers of the new user data
          this.currentUserSubject.next(response.data);
        }
        return response;
      }));
  }

  register(data: Object) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  getToken(): string | null {
    return this.currentUserValue?.token; // or wherever you store the token
  }
  


  getUserData(){
    var data=localStorage.getItem('currentUser')||''
    if(data==''){
      return false
    }else{
      return JSON.parse(data)
    }
  }
  getCurrentUserId(): string | null {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user?.id || null;  // Make sure 'currentUser' has an 'id' property
  }
 
}




