import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  nom: string = "";
  prenom: string = "";
  email: string = "";
  password: string = "";
  role: string = "";
  token: string | null = "";
  isModalOpen = false;
  selectedFile: File | null = null;

  constructor(private userService: UserService) {}

  onSubmit() {
    this.token = localStorage.getItem("token");
    const userData={
      email:this.email,
      firstName:this.prenom,
      lastName:this.nom,
      password:this.password,
      role:this.role
    }

    if (this.token) {
      this.userService.createUser(this.token, userData).subscribe({
        next: (response: any) => {
          this.nom = "";
          this.prenom = "";
          this.email = "";
          this.password = "";
          this.role = "";
          console.log("Utilisateur ajouté avec succès");
        },
        error: (err) => {
          console.error("Erreur lors de la création de l'utilisateur", err);
        }
      });
    } else {
      console.log("Token invalide");
    }
  }
  
  openModel(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop();
      if (fileExtension === 'xls' || fileExtension === 'xlsx') {
        this.selectedFile = file; 
      } else {
        alert('Veuillez sélectionner un fichier Excel valide (.xls ou .xlsx)');
        this.selectedFile = null; 
      }
    }
  }
  onAddUsers(){
    this.token=localStorage.getItem("token")
    if (this.selectedFile && this.token) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.userService.addUsers(this.token,formData).subscribe({
        next:(response:any)=>{
          console.log("file bien envoyee")
        },
        error:(err)=>{
          console.error(err)
        }
      })
      console.log('Fichier envoyé:', this.selectedFile.name);
      this.closeModal();
    } else {
      alert('Veuillez sélectionner un fichier avant d\'ajouter.');
    }
  }
}
