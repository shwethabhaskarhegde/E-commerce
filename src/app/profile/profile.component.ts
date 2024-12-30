import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../snackbar.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatIconModule,FormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {
    username: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    imageUrl: 'assets/images/default-avatar.jpg' // Default image path
  };

  isEditMode: boolean = false; 
  hovering: boolean = false;
  today: string = ''; 
  constructor(private snackbarService: SnackbarService) {}
  phoneError: boolean = false;

  validatePhoneNumber(): void {
    const phoneRegex = /^[0-9]{10}$/;
    this.phoneError = !phoneRegex.test(this.user.phone);
  }
  ngOnInit(): void {
    this.today = new Date().toISOString().split('T')[0]; 
    console.log('User image URL:', this.user.imageUrl);
    const localData = localStorage.getItem('user'); // Fetch user data
    if (localData) {
      this.user = JSON.parse(localData);
    }
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode; // Toggles edit mode state
  }
  
  // Function to save the updated data
  saveProfile() {
    this.validatePhoneNumber();
    if (this.phoneError) {
      this.snackbarService.showSnackbar(' please correct the phone number it should be 10 digits ', 'error');
      return;
    }
    localStorage.setItem('user', JSON.stringify(this.user));
    this.isEditMode = false;
    this.snackbarService.showSnackbar('Profile Updated Successfully', 'success');
  }

  // Function to upload a new image
  onFileChange(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.user.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
