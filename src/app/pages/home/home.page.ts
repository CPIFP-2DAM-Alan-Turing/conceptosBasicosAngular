import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  /**
   * Navigate to about page
   */
  about() {
    this.router.navigate(['/about']);
  }

    /**
   * Navigate to concerts page
   */
    concerts() {
      this.router.navigate(['/concerts']);
    }

}
