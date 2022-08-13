import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../model/jwt-dto';
import { LoginUsuario } from '../model/login-usuario';
import { NuevoUsuario } from '../model/nuevo-usuario'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL = ' https://bkdjustine.herokuapp.com/auth/'; /* cuando estaba localmente era http://localhost:8080/auth/ */
  constructor(private httpClient:HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any>{
    return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto>{
    return this.httpClient.post<JwtDto>(this.authURL + 'login', loginUsuario)
  } 
}

/*authURL = 'http://localhost:8080/auth/' es el endpoint del back*/
/* Lo del renglón 24 era antes, cunado estaba trabajando sin heroku y de manera unicamente local */