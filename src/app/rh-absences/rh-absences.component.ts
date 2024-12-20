import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { AbsenceService } from '../services/absence.service';
import { LocalStorageService } from '../services/local-storage.service';
import { response } from 'express';
import { Absence } from '../models/absence/absence.module';

@Component({
    selector: 'app-rh-absences',
    templateUrl: './rh-absences.component.html',
    styleUrl: './rh-absences.component.css',
    standalone: false
})
export class RhAbsencesComponent {
employes:Array<User>=[]
absences:Array<Absence>=[]
token:string|null=''
dateDebut!:Date
dateFin!:Date
email!:string
page: number = 1;
pageSize: number = 5;
paginatedData: any[] = [];
resume!:string;
loading:boolean=false;


constructor(private userService:UserService,private absenceService:AbsenceService,private localStorageService:LocalStorageService){}
ngOnInit():void{
  this.token=this.localStorageService.getItem("token")
  if(this.token){
    this.userService.getEmployes(this.token).subscribe({
      next:(response:any)=>{
        this.employes=response
      },
      error:(err)=>{
        console.error(err)
      }
    })
    this.absenceService.getAllNonJustifiedAbsences(this.token).subscribe({
      next:(response:any)=>{
        this.absences=response;
        this.paginateData();
      },
      error:(err)=>{
        console.error(err);
      }
    })
   
  }else{
    console.log("token invalid")
  }
}
getTotalPages(): number {
  return Math.ceil(this.absences.length / this.pageSize);
}
paginateData(): void {
  const start = (this.page - 1) * this.pageSize;
  const end = start + this.pageSize;
  this.paginatedData = this.absences.slice(start, end);
}
onPageChange(page: number): void {
  this.page = page;
  this.paginateData();
}
onSubmit(){
  if (!this.dateDebut || !this.dateFin || !this.email) {
    console.error('Veuillez remplir tous les champs.');
    return;
  }
  this.dateDebut = new Date(this.dateDebut);
  this.dateFin = new Date(this.dateFin);

  if (isNaN(this.dateDebut.getTime()) || isNaN(this.dateFin.getTime())) {
    console.error('Dates invalides.');
    return;
  }
  // Formatage des dates au format YYYY-MM-DD
  const formattedDateDebut = this.dateDebut.toISOString().split('T')[0];
  const formattedDateFin = this.dateFin.toISOString().split('T')[0];

  const absData = {
    dateDebut: formattedDateDebut,
    dateFin: formattedDateFin,
    userEmail: this.email
  };

  this.token = this.localStorageService.getItem("token");
  if (this.token != null) {
    this.absenceService.createAbsence(absData, this.token).subscribe({
      next: (response) => {
        // Réinitialiser les champs après l'envoi
        this.dateDebut = new Date();
        this.dateFin = new Date();
        this.email = "";
      },
      error: (err) => {
        console.error('Erreur lors du rejet du congé', err);
      }
    });
  }
}
downloadJustification(justificationId: string) {
  this.token=this.localStorageService.getItem("token");
  if(this.token){
  this.absenceService.downloadJustification(justificationId,this.token).subscribe({
    next: (blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = `justification_${justificationId}.pdf`; // Nom du fichier
      a.click();
      URL.revokeObjectURL(objectUrl);
    },
    error: (err) => {
      console.error('Erreur lors du téléchargement de la justification', err);
    }
  });
  }else{
    console.error("token vide");
  }
  
}
verifierJustification(justificationId:string){
  this.token=this.localStorageService.getItem("token");
  this.loading=true;
  if(this.token){
  this.absenceService.verifierJustification(justificationId,this.token).subscribe({
    next: (response:any) => {
      this.resume=response.data;
    },
    error: (err) => {
      console.error('Erreur lors du verification de la justification', err);
    }
  });
  }else{
    console.error("token vide");
  }
}

}