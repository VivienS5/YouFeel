import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

export interface PeriodicElement {
  id: number;
  commentaire: string;
  sentiment: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, commentaire: 'Je suis content', sentiment: 'content'},
  {id: 2, commentaire: 'Je suis pas content', sentiment: 'content'},
  {id: 3, commentaire: 'Je suis moyen', sentiment: 'content'},
  {id: 3, commentaire: 'Je suis moyen', sentiment: 'dissatisfied'},
];


@Component({
  selector: 'app-commentaire',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './commentaire.component.html',
  styleUrl: './commentaire.component.css'
})

export class CommentaireComponent {
  displayedColumns: string[] = ['id', 'commentaire', 'sentiment','avis'];
  dataSource = ELEMENT_DATA;

  getSentimentIcon(sentiment: string): string {
    switch(sentiment) {
      case 'content':
        return 'sentiment_satisfied_alt';
      case 'dissatisfied':
        return 'sentiment_dissatisfied';
      case 'very_satisfied':
        return 'sentiment_very_satisfied';
      case 'very_dissatisfied':
        return 'sentiment_very_dissatisfied';
      default:
        return '';
    }
  }
}
