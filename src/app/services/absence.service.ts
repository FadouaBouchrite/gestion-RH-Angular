import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  host:string="http://localhost:8080"
  token!:string
  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  }
  constructor(private http:HttpClient) { }
  getAllNonJustifiedAbsence(token:string){
    this.token=token
    const headers=this.getHeaders()
    return this.http.get(this.host+"/employe/getMyAbsences",{headers})
  }
  justifierAbsence(token:string,absenceId:number,formData:FormData){
    this.token=token
    const headers=this.getHeaders()
    return this.http.post(this.host+`/employe/justifierAbs/${absenceId}`,formData,{headers})
  }
  createAbsence(absData:any,token:string){
    this.token=token
    const headers=this.getHeaders()
    return this.http.post(this.host+"/rh/createAbsence",absData,{headers})
  }
}