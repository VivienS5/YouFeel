import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recup-back',
  templateUrl: './recup-back.component.html',
  styleUrls: ['./recup-back.component.css'],
})
export class RecupBackComponent implements OnInit {
  commentaires: any[]; 

  constructor(private http: HttpClient) { 
    this.commentaires = []; 
  }
  fetchData() {
    this.http.get<any[]>('http://127.0.0.1:5000/comments/json')
      .subscribe(data => {
        console.log(data);
        this.commentaires = data;
      });
  }
  
  ngOnInit(): void {
    this.fetchData();
  }
}
