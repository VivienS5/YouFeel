import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@Component({
  selector: 'app-api',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatProgressBarModule
    ],
  templateUrl: './api.component.html',
  styleUrl: './api.component.css',
})
export class ApiComponent {

  constructor(private readonly http: HttpClient) {}

  submitted = false;
  loading = false;
  
  onSubmit(){
  this.loading = true;
  this.submitted = true;
  }
}