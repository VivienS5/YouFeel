import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';


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
  displayedColumns: string[] = ['username', 'commentaire', 'emotion', 'avis'];
  dataSource: any[] = [];
  commentaires: any[] = []; 
  emotionIcon: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
    this.commentaires.forEach(commentaire => {
      console.log(commentaire.emotion);
    });
  }
  fetchData(): void {
    this.http.get<any[]>('http://127.0.0.1:5000/comments/json')
      .subscribe(data => {
        console.log(data);
        this.commentaires = data;
        this.dataSource = this.commentaires; 
        this.emotionIcon = this.commentaires.length > 0 ? this.commentaires[0].emotion : '';
      });
  }

  getSentimentIcon(emotionIcon: string): string {
    switch(emotionIcon) {
      case 'joy':
        return 'sentiment_satisfied_alt';
      case 'anger':
        return 'sentiment_dissatisfied';
      case 'fear':
        return 'sentiment_neutral';
      case 'sadness':
        return 'sentiment_very_dissatisfied';
      case 'surprise':
        return 'sentiment_satisfied';
      default:
        return '';
    }
  }  
}
