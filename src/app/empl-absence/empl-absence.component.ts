import { Component } from '@angular/core';
import { Absence } from '../models/absence/absence.module';
import { AbsenceService } from '../services/absence.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ChatbotService } from '../services/chatbot.service';

@Component({
    selector: 'app-empl-absence',
    templateUrl: './empl-absence.component.html',
    styleUrl: './empl-absence.component.css',
    standalone: false
})
export class EmplAbsenceComponent {
  absences: Array<Absence> = []; 
  token: string | null = '';
  constructor(private absenceService:AbsenceService,private localStorageService:LocalStorageService,private chatBoatService:ChatbotService){}
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
