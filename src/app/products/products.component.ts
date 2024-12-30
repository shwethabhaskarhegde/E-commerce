import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { SnackbarService } from 'src/app/snackbar.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public getJsonValue: any[] = [];
  public groupedProducts: { [key: string]: any[] } = {};
  public filteredProducts: any[] = [];
  public selectedCategory: string = '';
  public selectedPriceRange: string = ''; // Selected price range
  public searchQuery: string = '';
  isLoggedIn: boolean = false; 
  
  public priceRanges = [
    { value: '0-100', label: '₹0 - ₹100' },
    { value: '101-500', label: '₹101 - ₹500' },
    { value: '501-1000', label: '₹501 - ₹1000' },
    { value: '1001-5000', label: '₹1001 - ₹5000' },
    { value: '5001-', label: '₹5001 and above' },
  ];

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private snackbarService: SnackbarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((authenticated) => {
      this.isLoggedIn = authenticated;
    });

    this.getMethod();
  }

  public getMethod() {
    this.http.get('assets/dummy-api.json').subscribe((data: any) => {
      this.getJsonValue = data.products.map((product: any) => ({
        ...product,
        rating: parseFloat(product.rating) || 0,
        category: product.category || 'Uncategorized',
      }));
      this.groupProductsByCategory();
      this.filteredProducts = [...this.getJsonValue]; // Show all products initially
    });
  }

  groupProductsByCategory() {
    this.groupedProducts = this.getJsonValue.reduce(
      (acc: { [key: string]: any[] }, product: any) => {
        const category = product.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(product);
        return acc;
      },
      {}
    );
  }

  getCategoryKeys(): string[] {
    return Object.keys(this.groupedProducts);
  }

  filterByCategory(event: Event): void {
    const category = (event.target as HTMLSelectElement).value;
    this.selectedCategory = category;
    this.applyFilters();
  }

  filterByPrice(event: Event): void {
    this.selectedPriceRange = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  searchProducts(event: Event): void {
    const query = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchQuery = query;
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.getJsonValue];

    // Filter by category
    if (this.selectedCategory) {
      filtered = this.groupedProducts[this.selectedCategory] || [];
    }

    // Filter by search query
    if (this.searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(this.searchQuery)
      );
    }

    // Filter by price range
    if (this.selectedPriceRange) {
      const [min, max] = this.selectedPriceRange.split('-').map(Number);
      filtered = filtered.filter((product) => {
        return product.price >= min && (max ? product.price <= max : true);
      });
    }

    this.filteredProducts = filtered;
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    this.snackbarService.showSnackbar(
      `${product.title} has been added to your cart!`,
      'success'
    );
  }
}
