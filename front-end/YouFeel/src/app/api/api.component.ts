import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-api',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './api.component.html',
  styleUrl: './api.component.css',
})
export class ApiComponent {
  videoUrl: string = '';

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

  sendVideoUrl(): void {
    if (this.videoUrl.trim() === '') {
      this.snackBar.open('Veuillez entrer une URL de vidéo.', 'Fermer', {
        duration: 3000,
      });
      return;
    }

    this.http.post<any>('http://127.0.0.1:5000/process-video', { url: this.videoUrl })
      .subscribe(response => {
        console.log(response); // Traiter la réponse du backend ici
        // Rediriger vers le composant de commentaire avec les données reçues
        this.router.navigate(['commentaire'], { state: { data: response } });
      }, error => {
        console.error('Une erreur est survenue lors de la requête au backend :', error);
        this.snackBar.open('Une erreur est survenue. Veuillez réessayer plus tard.', 'Fermer', {
          duration: 5000,
        });
      });
  }
}