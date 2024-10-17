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
  isChangePasswordModalOpen = false; // Added to handle the password modal
  editUser: User = { email: '', linkedIn: '', twitter: '', firstName: '', lastName: '' };
  editPassword: string = '';
  pictureFile: File | null = null; // To hold the picture file
  oldPassword: string = '';
  newPassword: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userId = this.userService.getUserId(); // Fetch user ID

    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (user) => {
          this.user = user;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading user data', err);
          this.isLoading = false;
        }
      });
    }
  }

  openEditModal(): void {
    this.isEditModalOpen = true;
    this.editUser = { ...this.user } as User; // Clone user data to avoid directly modifying the original user object
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editPassword = ''; // Reset the password on modal close
    this.pictureFile = null; // Reset the picture file on modal close
  }

  onPictureChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.pictureFile = input.files[0]; // Capture the selected file
    }
  }

  updateUser(): void {
    if (this.user && this.editUser) {
      // Append the password if provided
      if (this.editPassword) {
        this.editUser.password = this.editPassword;
      }

      // Call the service to update user info, passing the profile picture if provided
      this.userService.updateUserInfo(this.user.id!, this.editUser, this.pictureFile).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          this.closeEditModal(); // Close modal after success
        },
        error: (err) => {
          console.error('Error updating user', err);
        }
      });
    }
  }

  // Open and close password change modal
  openChangePasswordModal(): void {
    this.isChangePasswordModalOpen = true;
  }

  closeChangePasswordModal(): void {
    this.isChangePasswordModalOpen = false;
  }

  // Method to handle password change
  changePassword(): void {
    if (this.user) {
      const userId = this.user.id; // Assuming you're fetching the user ID from the current user
      this.userService.changePassword(userId!, this.oldPassword, this.newPassword)
        .subscribe(
          (response) => {
            console.log('Password changed successfully', response);
            this.closeChangePasswordModal(); // Close modal after password change
          },
          (error) => {
            console.error('Error changing password', error);
          }
        );
    }
  }
}
