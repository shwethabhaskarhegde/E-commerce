import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cartItems';

  constructor() {
    this.loadCart();
  }

  private cartItems: any[] = [];

  // Load cart from localStorage
  private loadCart() {
    const storedCart = localStorage.getItem(this.storageKey);
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
  }

  // Save cart to localStorage
  private saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  }

  getCartItems() {
    return this.cartItems;
  }

  addToCart(product: any) {
    this.cartItems.push(product);
    this.saveCart(); // Save to localStorage
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCart(); // Save to localStorage
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart(); // Clear localStorage
  }
}
