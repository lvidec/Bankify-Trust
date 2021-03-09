import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(){
    console.log(this.auth.getUser());
    if(this.auth.getUser() != null && this.auth.getUser() != undefined) {
      if (this.auth.getUser().level != 2) {
        this.router.navigate(['accountBalance']);
        return false;
      }
      else
        return true;
    }
    return false;
  }}
