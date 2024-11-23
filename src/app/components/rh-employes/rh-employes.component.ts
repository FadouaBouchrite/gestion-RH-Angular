import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { error } from 'console';
import { response } from 'express';
import { StorageService } from '../../storage.service';
@Component({
  selector: 'app-rh-employes',
  templateUrl: './rh-employes.component.html',
  styleUrl: './rh-employes.component.css'
})
export class RhEmployesComponent {
   employes:Array<User>=[]
   rhs:Array<User>=[]
   token:string| null =''
   isEditModalOpen=false
   isDeleteModalOpen=false
   employe!:User

   constructor(private userService:UserService, private storageService: StorageService){}
   ngOnInit():void{
    this.token=this.storageService.getItem("token")
    if(this.token){
    this.getAllEmployes(this.token)
    console.log("token:"+this.token)
    this.getAllRhs(this.token)
    }
   }
   getAllEmployes(token:string){
    if (token) {
      this.userService.getEmployes(token).subscribe({
        next: (response: any) => {
          console.log('Réponse de l\'API:', response);
            this.employes = response; 
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des congés', err);
        }
      });
    } else {
      console.error('Token non disponible');
    }
   }
   getAllRhs(token:string){
    if (token) {
      this.userService.getRhs(token).subscribe({
        next: (response: any) => {
          console.log('Réponse de l\'API:', response);
            this.rhs = response; 
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des congés', err);
        }
      });
    } else {
      console.error('Token non disponible');
    }
   }
   editerUser(employe:User){
    this.isEditModalOpen=true
    this.employe=employe
   }
   closeModal(){
    this.isEditModalOpen=false
   }
   modifier(id: number | undefined) {
    if (id === undefined) {
        console.error("ID utilisateur non défini");
        return;
    }
    this.token = this.storageService.getItem("token");
    const userData = {
        lastName: this.employe.lastName,
        firstName: this.employe.firstName,
        email: this.employe.email
    };
    if (this.token) {
        this.userService.modifierUser(this.token, userData, id).subscribe({
            next: (response: any) => {
                this.closeModal();
                if(this.token)
                this.getAllEmployes(this.token);
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
  deleteUser(employe:User){
    this.isDeleteModalOpen=true
    this.employe=employe
  }
  closeDeleteModal(){
    this.isDeleteModalOpen=false
  }
  delete(id:number|undefined){
      if (id === undefined) {
          console.error("ID utilisateur non défini");
          return;
      }
      this.token = this.storageService.getItem("token");
      const userData = {
          lastName: this.employe.lastName,
          firstName: this.employe.firstName,
          email: this.employe.email
      };
      if (this.token) {
          this.userService.deleteUser(this.token, id).subscribe({
              next: (response: any) => {
                  this.closeDeleteModal();
                  if(this.token){
                  this.getAllEmployes(this.token);
                  this.getAllRhs(this.token)
                  }
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