import { Component } from '@angular/core';
import { CongeServiceService } from '../services/conge-service.service';
import { Conge } from '../models/conge/conge.module';
import { StorageService } from '../storage.service';


@Component({
  selector: 'app-employe-conge',
  templateUrl: './employe-conge.component.html',
  styleUrl: './employe-conge.component.css'
})
export class EmployeCongeComponent {
  token: string | null = '';
  dateDebut: Date= new Date();
  dateFin: Date= new Date();
  motif: string= '';
 
  
   constructor(private congeService:CongeServiceService,private storageService: StorageService){}

   onSubmit() {
    if (!this.dateDebut || !this.dateFin || !this.motif) {
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
  
    const congeData = {
      dateDebut: formattedDateDebut,
      dateFin: formattedDateFin,
      motif: this.motif
    };
  
    this.token = this.storageService.getItem("token");
    if (this.token != null) {
      this.congeService.createConge(congeData, this.token).subscribe({
        next: (response) => {
          // Réinitialiser les champs après l'envoi
          this.dateDebut = new Date();
          this.dateFin = new Date();
          this.motif = "";
        },
        error: (err) => {
          console.error('Erreur lors du rejet du congé', err);
        }
      });
    }
  }
}