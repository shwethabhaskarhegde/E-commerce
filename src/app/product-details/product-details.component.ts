import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductApiResponse } from '../products/products.module';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  public product: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
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
    // Implement cart functionality (reuse CartService)
    console.log('Adding to cart:', product);
  }
}
