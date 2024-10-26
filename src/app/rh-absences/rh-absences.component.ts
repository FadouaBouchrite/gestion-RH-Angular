import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { AbsenceService } from '../services/absence.service';

@Component({
  selector: 'app-rh-absences',
  templateUrl: './rh-absences.component.html',
  styleUrl: './rh-absences.component.css'
})
export class RhAbsencesComponent {
employes:Array<User>=[]
token:string|null=''
dateDebut!:Date
dateFin!:Date
email!:string
constructor(private userService:UserService,private absenceService:AbsenceService){}
ngOnInit():void{
  this.token=localStorage.getItem("token")
  if(this.token){
    this.userService.getEmployes(this.token).subscribe({
      next:(response:any)=>{
        this.employes=response
      },
      error:(err)=>{
        console.error(err)
      }
    })
  }else{
    console.log("token invalid")
  }
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

  this.token = localStorage.getItem("token");
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
}