import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  host:string="https://gestionrh-production.up.railway.app"
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
  getFy(token:string){
    this.token=token
    const headers=this.getHeaders();
    return this.http.get(this.host + "/rh/countByYear/2021", { headers });
  }
  getSy(token:string){
    this.token=token
    const headers=this.getHeaders();
    return this.http.get(this.host + "/rh/countByYear/2022", { headers });
  }
  getTy(token:string){
    this.token=token
    const headers=this.getHeaders();
    return this.http.get(this.host + "/rh/countByYear/2023", { headers });
  }
  getFty(token:string){
    this.token=token
    const headers=this.getHeaders();
    return this.http.get(this.host + "/rh/countByYear/2024", { headers });
  }
  getAllNonJustifiedAbsences(token:string){
    this.token=token
    const headers=this.getHeaders();
    return this.http.get(this.host + "/rh/getJustifiedAbs", { headers });
  }
  downloadJustification(justificationId: string,token:string) {
    this.token=token;
    const headers=this.getHeaders();
    return this.http.get(`${this.host}/rh/justification/${justificationId}`, {
      responseType: 'blob',
      headers
    });
  }
  verifierJustification(justificationId:string,token:string){
    this.token=token;
    const headers=this.getHeaders();
    return this.http.get(`${this.host}/rh/summarize/${justificationId}`, {
      headers
    });
  }
}