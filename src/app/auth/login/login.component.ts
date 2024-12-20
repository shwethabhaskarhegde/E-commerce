import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router to navigate
import { AuthService } from 'src/app/auth.service';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = ''; // User email
  password: string = ''; // User password
  errorMessage: string = ''; // Error message

  constructor(private authService: AuthService,private router: Router, private snackbarService: SnackbarService) {}

  // Handle form submission
  onSubmit() {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    // Check if the user data exists in localStorage
    if (storedUser && storedUser.email === this.email && storedUser.password === this.password) {
      // Login successful, navigate to home page
      const fakeToken = '1234567890';  // Replace this with a real token in production
      this.authService.login(fakeToken);
      this.snackbarService.showSnackbar('Login Successful.', 'success');
      this.router.navigate(['/home']);
    } else {
      // Login failed, show error message
      this.errorMessage = 'Invalid email or password!';
    }
  }
}
