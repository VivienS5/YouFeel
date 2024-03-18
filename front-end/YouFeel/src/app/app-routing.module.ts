import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { ApiComponent } from './api/api.component';
import { MockComponent } from './mock/mock.component';

const routes: Routes = [
  { path: 'commentaire', component: CommentaireComponent },
  { path: 'api', component: ApiComponent },
  { path: 'mock', component: MockComponent },
  { path: '', redirectTo: 'api', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export { routes };
