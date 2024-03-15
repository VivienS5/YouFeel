import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mock',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './mock.component.html',
  styleUrl: './mock.component.css',
})
export class MockComponent {
  constructor(private router: Router) {}
  redirectToComment() {
    this.router.navigate(['commentaire']);
  }
}
