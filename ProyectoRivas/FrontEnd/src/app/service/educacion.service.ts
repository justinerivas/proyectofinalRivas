import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../model/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  URL = 'http://localhost:8080/educacion/'; //esto sale del GetMapping

  constructor(private httpClient : HttpClient) { } //importo el HttpClient arriba

//Métodos
  public lista(): Observable<Educacion[]>{ //como es una lista, es un array. Me trae la lista educación
    return this.httpClient.get<Educacion[]>(this.URL + 'lista');
  }

  public detail(id: number): Observable<Educacion>{
    return this.httpClient.get<Educacion>(this.URL + `detail/${id}`); //comillas diferentes porque por parámetro envío un id
  }

  public save(educacion: Educacion): Observable<any>{ //crea objeto eduación
    return this.httpClient.post<any>(this.URL + 'create', educacion);
  }

  public update(id: number, educacion: Educacion): Observable<any>{
    return this.httpClient.put<any>(this.URL + `update/${id}`, educacion); //comillas diferentes
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.URL + `delete/${id}`);
  }
}