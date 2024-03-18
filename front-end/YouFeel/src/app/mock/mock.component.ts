import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface Commentaire {
  id: number;
  commentaire: string;
}

@Component({
  selector: 'app-mock',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
  ],
  templateUrl: './mock.component.html',
  styleUrl: './mock.component.css',
})
export class MockComponent {
  displayedColumns: string[] = ['id', 'commentaire'];
  listComment = new MatTableDataSource<Commentaire>([]);
  commentToPush: string = 'stylé';
  ngOnInit() {
    this.addToTable();
    // Ajoute d'autres commentaires si nécessaire
  }

  addToTable() {
    if (this.commentToPush == '') {
    } else {
      const nouveauCommentaire: Commentaire = {
        id: this.listComment.data.length + 1, // Ou une autre logique pour générer un ID unique
        commentaire: this.commentToPush,
      };
      const data = this.listComment.data;
      data.push(nouveauCommentaire);
      this.listComment.data = data;
      this.commentToPush = '';
    }
  }
  constructor(private router: Router) {}
  redirectToComment() {
    this.router.navigate(['commentaire']);
  }
}
