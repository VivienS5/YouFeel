import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { ApiComponent } from './api/api.component';
import { RecupBackComponent } from './recup-back/recup-back.component';

const routes: Routes = [
  { path: 'commentaire', component: CommentaireComponent },
  { path: 'api', component: ApiComponent },
  { path: 'recupback', component: RecupBackComponent },
  { path: '', redirectTo: 'api', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export { routes };
