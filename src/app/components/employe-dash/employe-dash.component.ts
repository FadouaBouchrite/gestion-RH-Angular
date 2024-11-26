import { Component } from '@angular/core';
import { Conge } from '../../models/conge/conge.module';
import { CongeServiceService } from '../../services/conge-service.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
    selector: 'app-employe-dash',
    templateUrl: './employe-dash.component.html',
    styleUrls: ['./employe-dash.component.css'],
    standalone: false
})
export class EmployeDashComponent {
  conges: Array<Conge> = []; 
  demande!: Conge | null;
  token: string | null = '';
  isEditModalOpen=false
  isDeleteModalOpen=false
  conge!:Conge

  constructor(private congeService: CongeServiceService,private localStorageService:LocalStorageService) {}

  ngOnInit(): void {
    console.log("Composant initialisé");
  }

  ngAfterViewInit(): void {
    this.token = this.localStorageService.getItem("token");
    if (this.token) {
      this.getCongesByUser(this.token);
    }
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

  deleteDemande(id: number |undefined) {
    if (id === undefined) {
      console.error("ID utilisateur non défini");
      return;
  }
    this.token = this.localStorageService.getItem("token");
    if (this.token != null) {
      this.congeService.deleteDemande(id, this.token).subscribe({
        next: (response: any) => {
            this.closeDeleteModal();
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

  editerConge(conge:Conge){
    this.isEditModalOpen=true
    this.conge=conge
   }
   closeModal(){
    this.isEditModalOpen=false
   }
  
  deleteConge(conge:Conge){
    this.isDeleteModalOpen=true
    this.conge=conge
  }
  closeDeleteModal(){
    this.isDeleteModalOpen=false
  }
  modifier(id: number | undefined) {
    if (id === undefined) {
        console.error("ID utilisateur non défini");
        return;
    }
    this.token = this.localStorageService.getItem("token");
    const congeData = {
        dateDebut: this.conge.dateDebut,
        dateFin: this.conge.dateFin,
        motif: this.conge.motif
    };
    if (this.token) {
        this.congeService.modifierConge(this.token, congeData, id).subscribe({
            next: (response: any) => {
                this.closeModal();
                if(this.token)
                this.getCongesByUser(this.token);
                console.log('Utilisateur modifié avec succès');
            },
            error: (err) => {
                console.error('Erreur lors de la modification de l\'utilisateur', err);
            }
        });
    } else {
        console.log("Token invalide");
    }
  }
}
