import { Component } from '@angular/core';
import { Conge } from '../models/conge/conge.module';
import { CongeServiceService } from '../services/conge-service.service';

@Component({
  selector: 'app-employe-conge',
  templateUrl: './employe-conge.component.html',
  styleUrl: './employe-conge.component.css'
})
export class EmployeCongeComponent {
  token: string | null = '';
  dateDebut: string= '';
  dateFin: string= '';
  motif: string= '';
   constructor(private congeService:CongeServiceService){}

   onSubmit(){
    if (!this.dateDebut || !this.dateFin || !this.motif) {
      console.error('Veuillez remplir tous les champs.');
      return;
    }
    const congeData={
      dateDebut:this.dateDebut,
      dateFin:this.dateFin,
      motif:this.motif
    }
    this.token = localStorage.getItem("token");
    if (this.token!=null)
    this.congeService.createConge(congeData,this.token).subscribe({
      next: (response) => {
        this.dateDebut=""
        this.dateFin=""
        this.motif=""
      },
      error: (err) => {
        console.error('Erreur lors du rejet du congé', err);
      }
    });
   }
}
