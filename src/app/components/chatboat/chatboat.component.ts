import { Component } from '@angular/core';
import { ChatbotService } from '../../services/chatbot.service';
import { ChatMessage } from '../../models/chat-message/chat-message.module';

@Component({
  selector: 'app-chatboat',
  standalone: false,
  
  templateUrl: './chatboat.component.html',
  styleUrl: './chatboat.component.css'
})
export class ChatboatComponent {
  constructor(private chatBoatService:ChatbotService){}
  token: string | null = '';
  response:string='';
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
