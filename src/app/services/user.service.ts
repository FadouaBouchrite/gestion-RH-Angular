import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model'; // Assurez-vous que ce modèle est bien créé

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/employe'; // Changez l'URL si nécessaire
  private endpoint="http://localhost:8080"

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}
  token!:string
  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  }

  // Récupérer l'ID de l'utilisateur connecté à partir du localStorage
  getUserId(): number | null {
    if (isPlatformBrowser(this.platformId)) {
      const id = localStorage.getItem('userId');
      return id ? Number(id) : null;
    }
    return null;
  }

  // Méthode de connexion qui retourne l'ID et le token de l'utilisateur
  login(userData: Object): Observable<{ id: number; token: string }> {
    return this.http.post<any>('http://localhost:8080/auth/login', userData).pipe(
      map(response => {
        // Stocker l'ID et le token dans localStorage après la connexion
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('userId', response.id);
          localStorage.setItem('token', response.token);
        }
        return {
          id: response.id,
          token: response.token,
          role:response.role
        };
      })
    );
  }

  // Méthode pour récupérer un utilisateur par son ID
  getUserById(id: number): Observable<User> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(`${this.baseUrl}/${id}`, { headers });
  }

  // Méthode pour mettre à jour les informations d'un utilisateur
  updateUserInfo(id: number, user: User, pictureFile: File | null): Observable<User> {
    const formData = new FormData();
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Ajouter les informations de l'utilisateur au FormData
    formData.append('firstName', user.firstName || '');
    formData.append('lastName', user.lastName || '');
    formData.append('email', user.email || '');
    formData.append('linkedIn', user.linkedIn || '');
    formData.append('twitter', user.twitter || '');

    // Ajouter la photo si elle est présente
    if (pictureFile) {
      formData.append('picture', pictureFile);
    }

    return this.http.put<User>(`${this.baseUrl}/${id}/update-info`, formData, { headers });
  }

  // Méthode pour changer le mot de passe d'un utilisateur
  changePassword(id: number, oldPassword: string, newPassword: string): Observable<string> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<string>(`${this.baseUrl}/${id}/change-password`, {
      oldPassword,
      newPassword
    }, { headers });
  }

  // Méthode utilitaire pour récupérer le token à partir du localStorage
  public getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  isAuthenticated() {
    const token = localStorage.getItem("token");
    return token !== null;
  }

  isRH() {
    const role = localStorage.getItem("role");
    return role === "RH";
  }

  isEmploye() {
    const role = localStorage.getItem("role");
    return role === "EMPLOYE";
  }

  getEmployes(token:string){
    this.token=token
    const headers=this.getHeaders()
    return this.http.get(this.endpoint+"/rh/getEmployes",{headers})
  }
  getRole(token:string){
    this.token=token
    const role=localStorage.getItem("role")
    return role
  }

  getRhs(token:string){
    this.token=token
    const headers=this.getHeaders()
    return this.http.get(this.endpoint+"/rh/getRhs",{headers})
  }

  createUser(token:string,userData:any){
    this.token=token
    const headers=this.getHeaders()
    return this.http.post("http://localhost:8080/rh/addUser",userData,{headers})
  }

  addUsers(token:string,file:FormData){
    this.token=token
    const headers=this.getHeaders()
    return this.http.post(this.endpoint+"/rh/addUsers",file,{headers})
  }

  modifierUser(token: string, userData: any, id: number) {
    this.token = token;
    const headers = this.getHeaders();
    return this.http.put(this.endpoint + `/rh/editUser/${id}`, userData, { headers });
  }
  deleteUser(token: string, id: number) {
    this.token = token;
    const headers = this.getHeaders();
    return this.http.delete(this.endpoint + `/rh/deleteUser/${id}`, { headers });
  }
  getRhNbr(token:string){
    this.token=token
    const headers=this.getHeaders();
    return this.http.get(this.endpoint + "/rh/getRhNbr", { headers });
  }
  getEmplNbr(token:string){
    this.token=token
    const headers=this.getHeaders();
    return this.http.get(this.endpoint + "/rh/getEmplNbr", { headers });
  }
  
}