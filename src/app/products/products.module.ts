import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
// src/app/models/product.model.ts

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: string;
  category: string;
}

export interface ProductApiResponse {
  products: Product[];
}
