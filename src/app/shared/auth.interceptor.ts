import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable, Injector} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector){}

  intercept(request : HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {

    let authService = this.injector.get(AuthService);

    const token = authService.getToken();

    if (token){

      const copiedReq = request.clone({
        setHeaders: {
              Authorization: `Bearer ${authService.getToken()}`
        },
        params : request.params.set('token', <string>authService.getToken())
      });

      return next.handle(copiedReq);

      // request = request.clone({
      //   setHeaders: {
      //     Authorization: `Bearer ${this.auth.getToken()}`
      //   }
      // });
      //
      // return next.handle(request);

    } else {
      return next.handle(request);
    }



  }

}
