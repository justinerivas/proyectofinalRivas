import { HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class InterceptorService {
    constructor(private tokenService: TokenService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        let intReq = req;
        const token = this.tokenService.getToken();
        if(token != null){
            intReq = req.clone({
                headers: req.headers.set('Authorization','Bearer'+token)
            });
        }
        return next.handle(intReq);
    }
}
//creo otro export con una constante interceptor provider
export const interceptorProvider = [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true }];

//el interceptor debería preguntar si el token es válido y de no serlo, pedir el loggin de nuevo.