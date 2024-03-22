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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  dataVideo: any[] = [];
  commentaires: any[] = []; 
  emotionIcon: string = '';
  youtubeTag: any;
  titreVideo: string = '';
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>;

  constructor(private http: HttpClient, public dialog: MatDialog, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.fetchComm();
    this.fetchData();
  }
  fetchComm(): void {
    this.http.get<any[]>('http://127.0.0.1:5000/comments/json')
      .subscribe(data => {
        console.log(data);
        this.commentaires = data;
        this.dataSource = this.commentaires;
        this.emotionIcon = this.commentaires.length > 0 ? this.commentaires[0].emotion_prediction : '';
      });
  }
  fetchData(): void {
    this.http.get<any>('http://127.0.0.1:5000/data_video')
      .subscribe(data => {
        console.log(data);
        this.dataVideo = data;
        this.titreVideo = data.titre;
        // bypassSecurityTrustResourceUrl evite les problemes xss
        this.youtubeTag = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + data.tag);
        
      });
  }

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
      case "0":
        return 'sentiment_sad'; //sadness
      case "1":
        return 'sentiment_very_satisfied';  //joy
      case "2":
        return 'volunteer_activism';  //love
      case "3":
        return 'sentiment_extremely_dissatisfied';  //anger
      case "4":
        return 'mood_bad';  //fear
      case "5":
        return 'sentiment_very_dissatisfied';  //surprise
      default:
        return 'sentiment_very_satisfied';
    }
  }  
}

