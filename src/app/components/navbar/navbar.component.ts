import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from 'src/app/service/service.service';
import { httpOptions } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private service:ServiceService,private router:Router, private http:HttpClient) { }

  isLogged = this.service.checkSession();
  isAdmin:any = false;
  sizeCarrito!:number;

  ngOnInit(): void {

    this.service.checkSessionAdmin().subscribe(data=>{
      if(data != true){

      }else{
        this.isAdmin = data;
      }
    })
    this.getSize();


  }

  getSize(){
    this.http.get<number>('http://localhost:8082/carrito/count',httpOptions).subscribe(data=>{
    this.sizeCarrito = data;
    })
  }


  logout(){

    this.isLogged = true;
    this.isAdmin = false;
    this.service.logoutSession();


  }


}
