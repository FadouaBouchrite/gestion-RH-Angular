import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CongeServiceService {
  host:string="http://localhost:8080"
  token!:string
  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  }
  constructor(private http:HttpClient) { }
  getAllNonValidatedConges(token:string){
    this.token=token
    const headers=this.getHeaders()
    return this.http.get(this.host+"/rh/getNonValidatedConges",{headers})
  }
  acceptConge(id:number,token:string){
    const headers=this.getHeaders()
    this.token=token
    return this.http.put(this.host + `/rh/acceptConge/${id}`, {} ,{headers})
  }
  rejectConge(id:number,token:string){
    this.token=token
    const headers=this.getHeaders()
    return this.http.put(this.host + `/rh/rejectConge/${id}`, {} ,{headers})
  }
}
