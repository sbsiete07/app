import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { httpOptions } from 'src/environments/environment';
import { User } from '../../model/user';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router, private service:ServiceService,private http:HttpClient) { }

  ngOnInit(): void {

    this.getAllUsers();

  }

  users!:User[];
  user1 : User = new User();
  error!:string;

  serchfind!:boolean;
  correoReg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  searchdni!:boolean;
  dniReg = new RegExp(/^(\d{8})([A-Z])$/);

  searchTelefono!:boolean;
  tlfReg = new RegExp(/^(\d{9})$/);

  searchPassword!:boolean;
  passwordReg = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);

  addUser(){

    this.serchfind = this.correoReg.test(this.user1.correo);
    this.searchdni = this.dniReg.test(this.user1.dni);
    this.searchTelefono = this.tlfReg.test(this.user1.telefono.toString());
    this.searchPassword = this.passwordReg.test(this.user1.password);

    if(this.serchfind){
      if(this.searchdni){
        if(this.searchTelefono){
          if(this.searchPassword){
            this.service.createUser(this.user1).subscribe(data => {
              alert("Usuario creado con éxito, gracias por unirte a nosotros")
              this.router.navigate(["/login"])
            },error=>{





            })
          }else{
            this.error = "La contraseña debe tener al menos 8 caracteres y 1 caracter en mayuscula"
          }

        }else{
          this.error = "Revise los campos de telefono"
        }

      }else{
        this.error = "Introduzca un dni valido (Con la letra mayuscula)"
      }

    }else{
      this.error = "Introduzca un correo valido"
    }



  }

  getAllUsers(){

    this.http.get<User[]>('http://localhost:8082/user/all',httpOptions).subscribe(data=>{
      this.users = data;
    })

  }


}
