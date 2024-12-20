import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/snackbar.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  model: any = {};  // This holds the form data

  constructor(private router: Router, private snackbarService: SnackbarService ) { }

  ngOnInit(): void {
    // Initialize model data if needed
  }

  // Handle form submission
  onSubmit(form: any): void {
    if (form.valid) {
      // Store data in localStorage or handle as necessary
      localStorage.setItem('user', JSON.stringify(this.model));
      console.log('Form Submitted!', this.model);
      // Navigate to login page after successful registration
      this.snackbarService.showSnackbar('Registration Successful. Please log in to proceed.', 'success');
      this.router.navigate(['/login']);
    } else {
      console.log('Form is invalid!');
    }
  }
}
