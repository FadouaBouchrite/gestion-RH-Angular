import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../environment/environment"
@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  private apiUrl: string = environment.apiUrl;
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
    return this.http.get(this.apiUrl+"/employe/getMyAbsences",{headers})
  }
  justifierAbsence(token:string,absenceId:number,formData:FormData){
    this.token=token
    const headers=this.getHeaders()
    return this.http.post(this.apiUrl+`/employe/justifierAbs/${absenceId}`,formData,{headers})
  }
  createAbsence(absData:any,token:string){
    this.token=token
    const headers=this.getHeaders()
    return this.http.post(this.apiUrl+"/rh/createAbsence",absData,{headers})
  }
  getFy(token:string){
    this.token=token
    const headers=this.getHeaders();
    return this.http.get(this.apiUrl + "/rh/countByYear/2021", { headers });
  }
  getSy(token:string){
    this.token=token
    const headers=this.getHeaders();
    return this.http.get(this.apiUrl + "/rh/countByYear/2022", { headers });
  }
  getTy(token:string){
    this.token=token
    const headers=this.getHeaders();
    return this.http.get(this.apiUrl + "/rh/countByYear/2023", { headers });
  }
  getFty(token:string){
    this.token=token
    const headers=this.getHeaders();
    return this.http.get(this.apiUrl + "/rh/countByYear/2024", { headers });
  }
}