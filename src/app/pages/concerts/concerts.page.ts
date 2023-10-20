import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.page.html',
  styleUrls: ['./concerts.page.scss'],
})
export class ConcertsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /**
  * Navigate to home page
  */
  home() {
    this.router.navigate(['/home']);
  }

}
