import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarmenuComponent } from './sidebarmenu/sidebarmenu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    HeaderComponent,
    MatSidenavModule,
    SidebarmenuComponent,
  ],
})
export class AppComponent {
  title = 'YouFeel';
}
