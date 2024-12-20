import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); // Observable for components to subscribe to

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Store the token when the user logs in
  login(token: string): void {
    localStorage.setItem('authToken', token);
    this.isAuthenticatedSubject.next(true); // Notify components of authentication change
  }

  // Remove the token to log the user out
  logout(): void {
    localStorage.removeItem('authToken');
    this.isAuthenticatedSubject.next(false); // Notify components of authentication change
  }
}
