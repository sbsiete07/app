import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {  Observable } from 'rxjs';
import { ServiceService } from './service.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})



export class AuthGuard implements CanActivate {

  constructor(private service:ServiceService,private router:Router){}
  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if(this.service.checkSession() == true){
      return true;
    }else{
      this.router.navigate(['']);
      return false;
    }
  }
}


