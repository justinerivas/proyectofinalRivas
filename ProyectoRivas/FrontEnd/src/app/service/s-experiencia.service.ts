import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiencia } from '../model/experiencia';

@Injectable({
  providedIn: 'root'
})
export class SExperienciaService {
  URL = environment.URL + 'explab/'; //sale del controller CExperiencia en la carpeta controller del apache
  // cuando no trabajaba con el heroku, y solo de manera local, la dirección era http://localhost:8080/explab

  constructor(private httpClient: HttpClient) { }
//método 1
  public lista(): Observable<Experiencia[]>{ //del tipo array porque son varias experiencias
    return this.httpClient.get<Experiencia[]>(this.URL + 'lista');
  }
// método 2
  public detail(id: number): Observable<Experiencia>{
    return this.httpClient.get<Experiencia>(this.URL + `detail/${id}`); //comillas diferentes porque paso valor por PathVariable?!
  } 

  public save(experiencia: Experiencia): Observable<any>{
    return this.httpClient.post<any>(this.URL + 'create', experiencia); //le paso objeto para crear un nuevo registro en la base de datos
  }

  public update(id: number, experiencia: Experiencia): Observable<any>{ //paso el id para que sepa de qué experiencia estoy hablando
    return this.httpClient.put<any>(this.URL + `update/${id}`, experiencia); //comillas diferentes
  }

  public delete(id: number): Observable<any>{ //no paso nada porque es ara eliminar
    return this.httpClient.delete<any>(this.URL + `delete/${id}`);
  }
}