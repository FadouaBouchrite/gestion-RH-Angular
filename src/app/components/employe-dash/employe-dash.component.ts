import { Component } from '@angular/core';
import { Conge } from '../../models/conge/conge.module';
import { CongeServiceService } from '../../services/conge-service.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { ChatbotService } from '../../services/chatbot.service';
import { ChatMessage } from '../../models/chat-message/chat-message.module';

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
  page: number = 1;
  pageSize: number = 5;
  paginatedData: Conge[] = [];

  constructor(private congeService: CongeServiceService,private localStorageService:LocalStorageService,private chatBoatService:ChatbotService) {}

  ngOnInit(): void {
    console.log("Composant initialisé");
    this.paginateData();
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
          this.paginateData();
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
            this.paginateData();
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
  
  showChat = false;
showNotification = false;
messages: { user: string; response: string }[] = []; // Associe directement question et réponse

userInput: string = '';

toggleChat(): void {
  this.showChat = !this.showChat;
}

sendMessage(): void {
  if (this.userInput.trim()) {
    const userMessage = this.userInput; // Sauvegarde le message utilisateur
    this.messages.push({ user: userMessage, response: '' }); // Ajoute le message utilisateur avec une réponse vide
    this.userInput = ''; // Réinitialise l'input utilisateur

    if (this.token) {
      this.chatBoatService.getResponse(this.token, userMessage).subscribe({
        next: (response: any) => {
          try {
            const botResponse = response.body.candidates[0].content.parts[0].text; // Récupère la réponse du bot
            this.messages[this.messages.length - 1].response = botResponse; // Associe la réponse au dernier message
          } catch (error) {
            console.error("Erreur lors du traitement de la réponse du bot", error);
          }
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de la réponse', err);
        }
      });
    }
  }
}

}
