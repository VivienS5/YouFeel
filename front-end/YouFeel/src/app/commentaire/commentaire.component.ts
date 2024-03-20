import { MatDialogActions, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { AfterViewInit, Component, ViewChild, Inject,TemplateRef, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

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
    MatButtonModule,
    MatDialogModule,

  ],
  templateUrl: './commentaire.component.html',
  styleUrl: './commentaire.component.css'
})

export class CommentaireComponent {
  displayedColumns: string[] = ['username', 'commentaire', 'emotion', 'avis'];
  dataSource: any[] = [];
  commentaires: any[] = []; 
  emotionIcon: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

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

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  openDialog(data:any): void {
    const dialogRef = this.dialog.open(this.dialogContent, {
      data: { element: data } 
    });
  }
  
  closeDialog(): void {
    this.dialog.closeAll();
  }

  getSentimentIcon(emotionIcon: string): string {
    switch(emotionIcon) {
      case 'joy':
        return 'sentiment_very_satisfied';
      case 'anger':
        return 'sentiment_extremely_dissatisfied';
      case 'fear':
        return 'mood_bad';
      case 'sadness':
        return 'sentiment_sad';
      case 'surprise':
        return 'sentiment_very_dissatisfied';
      case 'love':
        return 'volunteer_activism';
      default:
        return '';
    }
  }  
}

