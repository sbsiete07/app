import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { log } from '../model/log';
import { LoginComponent } from '../components/login/login.component';
import { Observable } from 'rxjs';
import { httpOptions } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {  Subject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { identifierName } from '@angular/compiler';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient,private cookieService: CookieService,private router:Router) { }

  url = 'http://localhost:8082/'

  isAdmin!:boolean;
  user!:User;

  getSizeCarrito(){
    return this.http.get('http://localhost:8082/carrito/count',httpOptions).subscribe(data=>{
      console.log(data);
    })
  }

  getSession(form:log){
    return this.http.post<User>(this.url + "session/",form,httpOptions);
  }

  getSessionData(): Observable<User>{
    return this.http.get<User>(this.url + 'session/',httpOptions);

  }

  checkSession(){
    if(sessionStorage.getItem("session") == null){
      return true;
    }else{
      return false;
    }
  }

  checkSessionAdmin() {
    return  this.http.get(this.url + 'user/isadmin',httpOptions);
  }

  logoutSession(){


    return this.http.delete(this.url + 'session/',httpOptions).subscribe(data =>{
      sessionStorage.clear();
      this.router.navigate(['']);
    })
  }

  createUser(user:User) : Observable<Object>{
    return this.http.post<User>(this.url + 'user/',user, httpOptions);
  }

  editUser(id:number,user:User): Observable<Object>{
    this.router.navigate(['']);
    this.getSessionData();
    return this.http.put(this.url + 'user/' + id, user, httpOptions);
  }

  getUser(id:number): Observable<Object>{

    return this.http.get<User>(this.url + 'user/' + id,httpOptions);
  }

  getAllUsers(): Observable<User[]>{

    return this.http.get<Array<User>>(this.url + 'user/all',httpOptions)

  }

  test(): Observable<User[]>{

    return this.http.get<User[]>(this.url + 'user/all',httpOptions).pipe(tap(data=>{
      return data;
    }))
  }

  deleteUser(id:number){
    return this.http.delete(this.url + 'user/' + id,httpOptions);
  }


  getProduct(id:number): Observable<Product>{

    return this.http.get<Product>(this.url + 'product/' + id,httpOptions);
  }


}





