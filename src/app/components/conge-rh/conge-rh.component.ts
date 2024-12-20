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
  page: number = 1;
  pageSize: number = 5;
  paginatedData: Conge[] = [];

  constructor(private congeService: CongeServiceService, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    console.log("Composant initialisé");
  }

  ngAfterViewInit(): void {
    this.token = this.localStorageService.getItem("token");
    if (this.token) {
      this.getAllNonValidatedConges(this.token);
    }
  }

  getAllNonValidatedConges(token: string) {
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
          this.paginateData(); // Mise à jour des données paginées après récupération
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
      next: () => {
        if(this.token != null) this.getAllNonValidatedConges(this.token);
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
      next: () => {
        if(this.token != null) this.getAllNonValidatedConges(this.token);
      },
      error: (err) => {
        console.error('Erreur lors de l\'acceptation du congé', err);
      }
    });
  }

  getTotalPages(): number {
    return Math.ceil(this.conges.length / this.pageSize);
  }

  paginateData(): void {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.conges.slice(start, end);
  }

  onPageChange(page: number): void {
    this.page = page;
    this.paginateData();
  }
}
