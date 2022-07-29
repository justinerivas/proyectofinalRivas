import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../model/experiencia';

@Injectable({
  providedIn: 'root'
})
export class SExperienciaService {
  expURL = 'http://localhost:8080/explab/'; //sale del controller CExperiencia en la carpeta controller del apache

  constructor(private httpClient: HttpClient) { }
//método 1
  public lista(): Observable<Experiencia[]>{ //del tipo array porque son varias experiencias
    return this.httpClient.get<Experiencia[]>(this.expURL + 'lista');
  }
// método 2
  public detail(id: number): Observable<Experiencia>{
    return this.httpClient.get<Experiencia>(this.expURL + `detail/${id}`); //comillas diferentes porque paso valor por PathVariable?!
  } 

  public save(experiencia: Experiencia): Observable<any>{
    return this.httpClient.post<any>(this.expURL + 'create', experiencia); //le paso objeto para crear un nuevo registro en la base de datos
  }

  public update(id: number, experiencia: Experiencia): Observable<any>{ //paso el id para que sepa de qué experiencia estoy hablando
    return this.httpClient.put<any>(this.expURL + `update/${id}`, experiencia); //comillas diferentes
  }

  public delete(id: number): Observable<any>{ //no paso nada porque es ara eliminar
    return this.httpClient.delete<any>(this.expURL + `delete/${id}`);
  }
}