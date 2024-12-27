import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  host:string="http://gestionrh-production.up.railway.app"
  token!:string
  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  }
  constructor(private http:HttpClient) {  }

  getResponse(token: string, userInput: string) {
    this.token = token;
    const headers = this.getHeaders();
    const body = {
      text: userInput
    };
    return this.http.post(this.host + "/employe/get-result", body, { headers });
  }
  
}
