import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ServiceService } from '../../service/service.service';
import { log } from '../../model/log';
import { User } from '../../model/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private service:ServiceService) { }

  ngOnInit(): void {}

  log : log = new log();
  mensaje = "";
  user1 : User = new User();
  loged = true;

  session(){
    // Loguear usuario

    return this.service.getSession(this.log).subscribe(data => {
      var lastday = new Date();
      sessionStorage.setItem("session",lastday.toLocaleString());
      this.router.navigate(['']);



    },error =>{
      console.log(error);
      this.loged = true;
      this.mensaje="Usuario o contraseña incorrectos!"
    });

    }


  check(){
    return this.service.checkSession();

  }

  logout(){
    return this.service.logoutSession()

  }


}






