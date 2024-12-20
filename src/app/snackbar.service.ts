import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface SnackbarState {
  message: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbarState = new BehaviorSubject<SnackbarState>({ message: '', type: 'info' });
  snackbarState$ = this.snackbarState.asObservable();

  showSnackbar(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') {
    this.snackbarState.next({ message, type });
  }
}
