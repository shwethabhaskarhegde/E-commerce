import { Component, HostListener,OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { RouterModule , Router} from '@angular/router';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports :[MatToolbarModule, MatButtonModule, MatIconModule, NavbarComponent, MatMenuModule, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  menuOpen = false;
  isMobileView = false;
  isLoggedIn: boolean = false; 
  

  constructor(private authService: AuthService, private router: Router) {}
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  // Add this variable to track the login status

  @HostListener('window:resize', [])
  onResize() {
    this.checkView();
  }

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((authenticated) => {
      this.isLoggedIn = authenticated;
    });

    this.checkView();
  }

  checkView() {
    this.isMobileView = window.innerWidth < 768; // Define breakpoint for mobile view
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']); // Optionally navigate to home page after logout
  }
}