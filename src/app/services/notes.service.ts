import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const apiUrl = 'http://localhost:4200/';

@Injectable()
export class NotesService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  getNotes() {
    return this.http.get(`${apiUrl}/Notes`, { headers: this.getHeaders() });
  }

  private getHeaders(){
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }
}
