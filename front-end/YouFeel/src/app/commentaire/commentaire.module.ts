import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentaireComponent } from './commentaire.component';

@NgModule({
  declarations: [
    CommentaireComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommentaireComponent
  ]
})
export class CommentaireModule { }
