import { Component } from '@angular/core';
import { Conge } from '../../models/conge/conge.module';
import { CongeServiceService } from '../../services/conge-service.service';

@Component({
  selector: 'app-employe-dash',
  templateUrl: './employe-dash.component.html',
  styleUrls: ['./employe-dash.component.css']
})
export class EmployeDashComponent {
  conges: Array<Conge> = []; 
  demande!: Conge | null;
  token: string | null = '';

  constructor(private congeService: CongeServiceService) {}

  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    if (this.token != null)
      this.getCongesByUser(this.token);
  }

  openDetailModal(c: Conge) {
    this.demande = c; 
  }

  getCongesByUser(token: string) {
    if (this.token != null) {
      this.congeService.getCongesByUser(token).subscribe({
        next: (response: any) => {
          console.log('Réponse de l\'API:', response);
          if (Array.isArray(response)) {
            this.conges = response; 
          } else if (response && response.data && Array.isArray(response.data)) {
            this.conges = response.data;
          } else {
            console.error('Format de réponse inattendu:', response);
          }
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des congés', err);
        }
      });
    } else {
      console.error('Token non disponible');
    }
  }

  deleteDemande(id: number) {
    this.token = localStorage.getItem("token");
    if (this.token != null) {
      this.congeService.deleteDemande(id, this.token).subscribe({
        next: (response: any) => {
          if (this.token != null)
            this.getCongesByUser(this.token);
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des congés', err);
        }
      });
    } else {
      console.error('Token non disponible');
    }
  }

  updateDemande(id: number) {
    this.token = localStorage.getItem("token");
    if (this.token != null) {
      this.congeService.updateDemande(id, this.token).subscribe({
        next: (response: any) => {
          if (this.token != null)
            this.getCongesByUser(this.token);
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des congés', err);
        }
      });
    } else {
      console.error('Token non disponible');
    }
  }
}
