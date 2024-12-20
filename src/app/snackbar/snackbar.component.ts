import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../snackbar.service';
@Component({
  selector: 'app-snackbar',
  template: `
    <div *ngIf="message" [ngClass]="['snackbar', type]" (click)="clearMessage()">
      {{ message }}
      <button class="close-btn" (click)="clearMessage($event)">&times;</button>
    </div>
  `,
  styleUrls: ['./snackbar.component.css'],
})
export class SnackbarComponent implements OnInit {
  message: string | null = null;
  type: string = 'info';

  constructor(private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    // Subscribe to the snackbar messages
   
      this.snackbarService.snackbarState$.subscribe((state: { message: string; type: string }) => {
        this.message = state.message;
        this.type = state.type;
        if (state.message) {
          setTimeout(() => {
            this.clearMessage();
          }, 5000);
        }
      });
    }

  clearMessage(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.message = null;
  }
}
