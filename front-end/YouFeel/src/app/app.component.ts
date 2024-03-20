import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarmenuComponent } from './sidebarmenu/sidebarmenu.component';
import { RecupBackModule } from './recup-back/recup-back.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

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
    RecupBackModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule, 

  ],
})
export class AppComponent {
  title = 'YouFeel';
}
