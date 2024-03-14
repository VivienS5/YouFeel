import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebarmenu',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './sidebarmenu.component.html',
  styleUrl: './sidebarmenu.component.scss',
})
export class SidebarmenuComponent {
  redirectToAPI() {
    this.router.navigate(['/commentaire']);
  }
  redirectToMock() {
    throw new Error('Method not implemented.');
  }
  constructor(private router: Router) {}
}