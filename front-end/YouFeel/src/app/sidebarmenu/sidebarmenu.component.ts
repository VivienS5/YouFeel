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
    this.router.navigate(['/api']);
  }
  redirectToMock() {
    this.router.navigate(['/mock']);
  }
  constructor(private router: Router) {}
}
