import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../environment/environment"
@Injectable({
  providedIn: 'root'
})
export class CongeServiceService {
  private apiUrl = environment.apiUrl;
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
    return this.http.get(this.apiUrl+"/rh/getNonValidatedConges",{headers})
  }
  acceptConge(id:number,token:string){
    const headers=this.getHeaders()
    this.token=token
    return this.http.put(this.apiUrl + `/rh/acceptConge/${id}`, {} ,{headers})
  }
  rejectConge(id:number,token:string){
    this.token=token
    const headers=this.getHeaders()
    return this.http.put(this.apiUrl + `/rh/rejectConge/${id}`, {} ,{headers})
  }
  createConge(congeData:Object,token:string){
    this.token=token
    const headers=this.getHeaders()
    return this.http.post(this.apiUrl+"/employe/create_conge",congeData,{headers})
  }
  getCongesByUser(token:string){
    this.token=token
    const headers=this.getHeaders()
    return this.http.get(this.apiUrl+"/employe/getConges",{headers})
  }
  deleteDemande(id:number,token:string){
    this.token=token
    const headers=this.getHeaders()
    return this.http.delete(this.apiUrl+`/employe/deleteConge/${id}`,{headers})
  }
  modifierConge(token:string,congeData:any,id:number){
    this.token=token
    const headers=this.getHeaders()
    return this.http.put(this.apiUrl+`/employe/updateConge/${id}`,congeData,{headers})
  }
}