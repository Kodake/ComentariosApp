import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from '../models/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  myAppUrl = 'https://localhost:44352/';
  myApiUrl = 'api/Comentario/';

  httpOptions = {
    headers: new HttpHeaders({
      'Context-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getListComentario(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.myAppUrl + this.myApiUrl);
  }

  deleteComentario(id: number): Observable<Comentario> {
    return this.http.delete<Comentario>(this.myAppUrl + this.myApiUrl + id);
  }

  guardarComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(this.myAppUrl + this.myApiUrl, comentario, this.httpOptions);
  }

  cargarComentario(id: number): Observable<Comentario> {
    return this.http.get<Comentario>(this.myAppUrl + this.myApiUrl + id);
  }

  actualizarComentario(id: number, comentario: Comentario): Observable<Comentario> {
    return this.http.put<Comentario>(this.myAppUrl + this.myApiUrl + id, comentario, this.httpOptions);
  }
}