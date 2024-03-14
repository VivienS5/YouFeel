import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentaireComponent } from './commentaire/commentaire.component';

const routes: Routes = [
  { path: 'commentaire', component: CommentaireComponent },
  { path: '', redirectTo: 'commentaire', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export { routes };
