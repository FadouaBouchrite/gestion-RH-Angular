import { Component } from '@angular/core';
import { CongeServiceService } from '../services/conge-service.service';
import { Conge } from '../models/conge/conge.module';
import { LocalStorageService } from '../services/local-storage.service';
import { ChatbotService } from '../services/chatbot.service';



@Component({
    selector: 'app-employe-conge',
    templateUrl: './employe-conge.component.html',
    styleUrl: './employe-conge.component.css',
    standalone: false
})
export class EmployeCongeComponent {
  token: string | null = '';
  dateDebut: Date= new Date();
  dateFin: Date= new Date();
  motif: string= '';
 
  
   constructor(private congeService:CongeServiceService,private localStorageService:LocalStorageService,private chatBoatService:ChatbotService){}

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
  
    this.token = this.localStorageService.getItem("token");
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