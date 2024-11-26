import { Component, OnInit } from '@angular/core';
import { Conge } from '../../models/conge/conge.module';
import { CongeServiceService } from '../../services/conge-service.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
    selector: 'app-conge-rh',
    templateUrl: './conge-rh.component.html',
    styleUrls: ['./conge-rh.component.css'],
    standalone: false
})
export class CongeRhComponent implements OnInit {
  conges: Array<Conge> = []; 
  token: string | null = '';

  constructor(private congeService: CongeServiceService,private localStorageService:LocalStorageService) {}

 
  ngOnInit(): void {
    console.log("Composant initialisé");
  }

  ngAfterViewInit(): void {
    this.token = this.localStorageService.getItem("token");
    if (this.token) {
      this.getAllNonValidatedConges(this.token);
    }
  }
  getAllNonValidatedConges(token:string){
  
    if (this.token) {
      this.congeService.getAllNonValidatedConges(this.token).subscribe({
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
  rejectConge(id: number): void {
    if (!this.token) {
      console.error('Le token est nul ou indéfini');
      return;
    }
  
    this.congeService.rejectConge(id, this.token).subscribe({
      next: (response) => {
        if(this.token!=null)
        this.getAllNonValidatedConges(this.token)
      },
      error: (err) => {
        console.error('Erreur lors du rejet du congé', err);
      }
    });
  }
  
  acceptConge(id: number): void {
    if (!this.token) {
      console.error('Le token est nul ou indéfini');
      return;
    }
  
    this.congeService.acceptConge(id, this.token).subscribe({
      next: (response) => {
        if(this.token!=null)
          this.getAllNonValidatedConges(this.token)
      },
      error: (err) => {
        console.error('Erreur lors de l\'acceptation du congé', err);
      }
    });
  }  
}
