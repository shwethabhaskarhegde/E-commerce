import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductApiResponse } from '../products/products.module';
import { CartService } from '../cart.service';
import { SnackbarService } from 'src/app/snackbar.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  public product: any;
  isLoggedIn: boolean = false;
  constructor(private route: ActivatedRoute, private http: HttpClient, private cartService: CartService,
    private snackbarService: SnackbarService, private authService:AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((authenticated) => {
      this.isLoggedIn = authenticated;
    });

    const productId = this.route.snapshot.paramMap.get('id'); 
    console.log('Product ID from URL:', productId);
    if (productId) {
      this.getProductDetails(productId.toString()); 
      
    }
  }

  getProductDetails(id: string | null): void {
    if (id) {
      console.log('Fetching details for product with id:', id);
      this.http.get<ProductApiResponse>(`assets/dummy-api.json`).subscribe((data) => {
        console.log('Fetched data:', data);
        const product = data.products.find((p: any) => p.id === id); 
        if (product) {
          this.product = product; // Store the product details
        } else {
          console.error('Product not found');
        } // Store the product details
      });
    }
  }
  addToCart(product: any): void {
    this.cartService.addToCart(product);
    this.snackbarService.showSnackbar(
      `${product.title} has been added to your cart!`,
      'success'
    );
  }
  showReviews: boolean = false; // Controls the visibility of the reviews section

  // Function to toggle the reviews section
  toggleReviews() {
    this.showReviews = !this.showReviews;
  }
}
