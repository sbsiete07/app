import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


user = new User();

  constructor(private service:ServiceService,private router:Router){}

  canActivate():any{


    return this.service.checkSessionAdmin().subscribe(data=>{
      if(data != true){
        this.router.navigate([''])
      }
    })


   }


}


