import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; // Ensure you have this model created
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/employe'; // Change the URL if necessary

  constructor(private http: HttpClient) {}

  getUserId(): number | null {
    return 5; // Replace with your actual logic to get the user ID
  }

  getUserById(id: number): Observable<User> {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXNAZXhhbXBsZS5jb20iLCJpYXQiOjE3MjkxMzQ4NjIsImV4cCI6MTcyOTIyMTI2Mn0.usAmTt2pfDkhMwBtFCI4rMIPBot3tKKGb5W-OQDXq6s';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<User>(`${this.baseUrl}/${id}`, { headers });  }

  updateUserInfo(id: number, user: User, pictureFile: File | null): Observable<User> {
    const formData = new FormData();
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXNAZXhhbXBsZS5jb20iLCJpYXQiOjE3MjkxMzQ4NjIsImV4cCI6MTcyOTIyMTI2Mn0.usAmTt2pfDkhMwBtFCI4rMIPBot3tKKGb5W-OQDXq6s';

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Append user information to the FormData object
    formData.append('firstName', user.firstName || '');
    formData.append('lastName', user.lastName || '');
    formData.append('email', user.email || '');
    formData.append('linkedIn', user.linkedIn || '');
    formData.append('twitter', user.twitter || '');

    // Append the picture file if it's provided
    if (pictureFile) {
      formData.append('picture', pictureFile);
    }

    return this.http.put<User>(`${this.baseUrl}/${id}/update-info`, formData, { headers });
  }

  changePassword(id: number, oldPassword: string, newPassword: string): Observable<string> {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXNAZXhhbXBsZS5jb20iLCJpYXQiOjE3MjkxMzQ4NjIsImV4cCI6MTcyOTIyMTI2Mn0.usAmTt2pfDkhMwBtFCI4rMIPBot3tKKGb5W-OQDXq6s';

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<string>(`${this.baseUrl}/${id}/change-password`, {
      oldPassword,
      newPassword,
    },{headers});
  }
}
