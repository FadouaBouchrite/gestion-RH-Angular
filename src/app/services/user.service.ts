import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; // Ensure you have this model created

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users'; // Change the URL if necessary

  constructor(private http: HttpClient) {}

  getUserId(): number | null {
    return 1; // Replace with your actual logic to get the user ID
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  updateUserInfo(id: number, user: User, pictureFile: File | null): Observable<User> {
    const formData = new FormData();

    // Append user information to the FormData object
    formData.append('name', user.name || '');
    formData.append('email', user.email || '');
    formData.append('linkedIn', user.linkedIn || '');
    formData.append('twitter', user.twitter || '');

    // Append the picture file if it's provided
    if (pictureFile) {
      formData.append('picture', pictureFile);
    }

    return this.http.put<User>(`${this.baseUrl}/${id}/update-info`, formData);
  }

  changePassword(id: number, oldPassword: string, newPassword: string): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${id}/change-password`, {
      oldPassword,
      newPassword,
    });
  }
}
