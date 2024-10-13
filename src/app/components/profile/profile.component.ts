// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isLoading = true;
  isEditModalOpen = false;
  editUser: User = { email: '', linkedIn: '', twitter: '', name: '' }; // Initialize with default values
  editPassword: string = '';
  pictureFile: File | null = null; // Variable to hold the picture file

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userId = this.userService.getUserId();

    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (user) => {
          this.user = user;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading user data', err);
          this.isLoading = false; // Stop loading on error
        }
      });
    }
  }

  openEditModal(): void {
    this.isEditModalOpen = true;
    this.editUser = { ...this.user } as User; // Clone user data
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editPassword = ''; // Reset password on modal close
    this.pictureFile = null; // Reset picture file on modal close
  }

  onPictureChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.pictureFile = input.files[0]; // Get the selected file
    }
  }

  updateUser(): void {
    if (this.user && this.editUser) {
      // Check if password is provided before updating
      if (this.editPassword) {
        this.editUser.password = this.editPassword;
      }

      this.userService.updateUserInfo(this.user.id!, this.editUser, this.pictureFile).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          this.closeEditModal();
        },
        error: (err) => {
          console.error('Error updating user', err);
          // Display a friendly notification instead of alert
        }
      });
    } else {
      // Notify user of required password if needed
    }
  }
}
