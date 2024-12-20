import { Component, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   currentUrl: string = ''
  constructor(private router: Router, private renderer: Renderer2) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        if (event.url.includes('/product')) {
          this.renderer.addClass(document.body, 'allow-scroll');
          
        } else {
          this.renderer.removeClass(document.body, 'allow-scroll');
        }
      }
    });
  }
}
