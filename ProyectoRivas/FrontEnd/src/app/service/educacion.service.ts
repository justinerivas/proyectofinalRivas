import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Educacion } from '../model/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  URL = environment.URL + 'educacion/'; 
  //cuando no trabajaba con heroku y solo lo hacía de manera local la dirección era http://localhost:8080/educacion y salía del getmmapping


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