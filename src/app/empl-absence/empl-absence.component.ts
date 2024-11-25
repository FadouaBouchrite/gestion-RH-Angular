import { Component } from '@angular/core';
import { Absence } from '../models/absence/absence.module';
import { AbsenceService } from '../services/absence.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-empl-absence',
  templateUrl: './empl-absence.component.html',
  styleUrl: './empl-absence.component.css'
})
export class EmplAbsenceComponent {
  absences: Array<Absence> = []; 
  token: string | null = '';
  constructor(private absenceService:AbsenceService,private localStorageService:LocalStorageService){}
  ngOnInit(): void {
    // Récupération du token depuis localStorage
    this.token = this.localStorageService.getItem("token");
    
    if (!this.token) {
      console.warn("Aucun token trouvé dans le localStorage.");
    } else {
      console.log("Token récupéré:", this.token);
    }
  }
  
  ngAfterViewInit(): void {
    // Effectuer l'appel pour les absences une fois que la vue est initialisée
    if (this.token) {
      this.getAllNonJustifiedAbsence(this.token);
    } else {
      console.warn("Impossible de récupérer les absences non justifiées, le token est manquant.");
    }
  }
  
  getAllNonJustifiedAbsence(token:string){
      if (this.token) {
        this.absenceService.getAllNonJustifiedAbsence(this.token).subscribe({
          next: (response: any) => {
            console.log('Réponse de l\'API:', response);
            if (Array.isArray(response)) {
              this.absences = response; 
            } else if (response && response.data && Array.isArray(response.data)) {
              this.absences = response.data;
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
    
    onFileSelected(event: any, absenceId: number) {
      const file: File = event.target.files[0];  // Récupérer le fichier sélectionné
    
      if (file) {
        const formData = new FormData();
        formData.append('file', file);  // Ajouter le fichier dans FormData
    
        // Envoyer la justification automatiquement après sélection
        this.sendJustification(absenceId, formData);
      }
    }
    
    sendJustification(absenceId: number, formData: FormData) {
      const token = this.localStorageService.getItem("token");  // Récupérer le token
    
      if (this.token != null) {
        this.absenceService.justifierAbsence(this.token, absenceId, formData)
          .subscribe({
            next: (response: any) => {
              console.log('Justification envoyée avec succès', response);
              if (this.token != null) {
                this.getAllNonJustifiedAbsence(this.token);  // Rafraîchir la liste après l'envoi
              }
            },
            error: (err) => {
              console.error('Erreur lors de l\'envoi de la justification', err);
            }
          });
      } else {
        console.error('Token non disponible');
      }
    }
    
    
}
