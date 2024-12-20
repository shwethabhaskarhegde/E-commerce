import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AuthModule } from './auth/auth.module';
import { ProductsComponent } from './products/products.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SnackbarService } from './snackbar.service';
import { MatIconModule } from '@angular/material/icon';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    AboutUsComponent,
    ContactUsComponent,
    SnackbarComponent,
    CartComponent,
    ProductDetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FooterComponent,
    BrowserAnimationsModule,
    NavbarComponent,
    AuthModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileComponent,
    MatIconModule
  ],
  providers: [SnackbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
