import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!request.url.includes("/auth/login")) {
      let newRequest = request.clone({
        headers: request.headers
          .set('Authorization', 'Bearer ' + this.authService.accessToken)
      })
      return next.handle(newRequest);
    } else return next.handle(request);
  }
}