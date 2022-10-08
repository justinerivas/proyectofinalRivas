import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {
  URL = environment.URL + 'personas/'; /*va a enviroment y dependiendo con qué ambiente trabaje es uno o el otro */

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<persona[]>{ 
    return this.httpClient.get<persona[]>(this.URL + 'lista');
  }

  public detail(id: number): Observable<persona>{
    return this.httpClient.get<persona>(this.URL + `detail/${id}`); //comillas diferentes porque por parámetro envío un id
  }

  /*
  public save(persona: Persona): Observable<any>{ 
    return this.httpClient.post<any>(this.URL + 'create', persona);
  } 
  */ //lo comento porque en el back no los uso. 

  public update(id: number, Persona: persona): Observable<any>{
    return this.httpClient.put<any>(this.URL + `update/${id}`, Persona); //comillas diferentes
  }

 /* 
 public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.URL + `delete/${id}`);
  }
  */ //lo comento porque en el back no los uso

}