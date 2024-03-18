import { AfterViewInit, Component, ViewChild, Inject,TemplateRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog,MatDialogContent,MatDialogActions } from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

export interface commentaireElement {
  id: number;
  commentaire: string;
  sentiment: string;
}


const ELEMENT_DATA: commentaireElement[] = [
  {id: 1, commentaire: "Je suis vraiment triste !", sentiment: "sad"},
  {id: 2, commentaire: "Je suis content...", sentiment: "joy"},
  {id: 3, commentaire: "J'adore.", sentiment: "love"},
  {id: 4, commentaire: "Je suis en colère.", sentiment: "angry"},
  {id: 5, commentaire: "J'ai peur.", sentiment: "fear"},
  {id: 6, commentaire: "Je suis supris.", sentiment: "surprise"},
  {id: 7, commentaire: "Je ne suis pas convaincu...", sentiment: "surprise"},
  {id: 8, commentaire: "Ça me met de bonne humeur.", sentiment: "surprise"},
  {id: 9, commentaire: "Je me sens plutôt satisfait.", sentiment: "surprise"},
  {id: 10, commentaire: "Je ne m'y attendais pas, c'est super !", sentiment: "surprise"},
  {id: 11, commentaire: "Je suis plutôt désappointé.", sentiment: "surprise"},
  {id: 12, commentaire: "Je ne peux pas m'empêcher de sourire !", sentiment: "surprise"},
  {id: 13, commentaire: "C'est un peu frustrant...", sentiment: "surprise"},
  {id: 14, commentaire: "Je suis complètement euphorique !", sentiment: "surprise"},
  {id: 15, commentaire: "Ça me laisse perplexe...", sentiment: "surprise"},
  {id: 16, commentaire: "Je suis aux anges !", sentiment: "surprise"},
  {id: 17, commentaire: "Je me sens plutôt déprimé.", sentiment: "surprise"},
  {id: 18, commentaire: "Ça me met en colère !", sentiment: "surprise"},
  {id: 19, commentaire: "Je suis plutôt désabusé...", sentiment: "surprise"},
  {id: 20, commentaire: "Je suis complètement heureux !", sentiment: "surprise"},
  {id: 21, commentaire: "Je ne sais pas trop quoi penser...", sentiment: "angry"},
  {id: 22, commentaire: "Je suis aux anges !", sentiment: "angry"},
  {id: 23, commentaire: "Je suis assez déçu.", sentiment: "angry"},
  {id: 24, commentaire: "Je suis ravi !", sentiment: "angry"},
  {id: 25, commentaire: "Je ne suis pas très satisfait...", sentiment: "angry"},
  {id: 26, commentaire: "Je suis comblé de bonheur !", sentiment: "joy"},
  {id: 27, commentaire: "C'est assez déprimant...", sentiment: "angry"},
  {id: 28, commentaire: "Je suis super content !", sentiment: "angry"},
  {id: 29, commentaire: "Je suis plutôt déçu.", sentiment: "angry"},
  {id: 30, commentaire: "Je suis absolument ravi !", sentiment: "angry"},
  {id: 31, commentaire: "Je suis un peu contrarié...", sentiment: "angry"},
];



@Component({
  selector: 'app-commentaire',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatDialogContent,
    MatDialogActions,
    MatButtonModule

  ],
  templateUrl: './commentaire.component.html',
  styleUrl: './commentaire.component.css'
})
export class CommentaireComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'commentaire', 'sentiment', 'avis'];
  dataSource = new MatTableDataSource<commentaireElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>;

  constructor(public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(element: commentaireElement): void {
    const dialogRef = this.dialog.open(this.dialogContent, {
      data: { element: element } // Passer l'élément comme propriété "element" dans l'objet data
    });
  }
  
  closeDialog(): void {
    this.dialog.closeAll();
  }

  getSentimentIcon(sentiment: string): string {
    switch (sentiment) {
      case 'sad':
        return 'sentiment_sad';
      case 'joy':
        return 'sentiment_very_satisfied';
      case 'love':
        return 'volunteer_activism';
      case 'angry':
        return 'sentiment_extremely_dissatisfied';
      case 'fear':
        return 'mood_bad';
      case 'surprise':
        return 'sentiment_very_dissatisfied';
      default:
        return '';
    }
  }
}