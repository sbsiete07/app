import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { ServiceService } from 'src/app/service/service.service';
import { httpOptions } from 'src/environments/environment';

@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.css']
})
export class ListausuariosComponent implements OnInit {

  constructor(private service:ServiceService,private http:HttpClient) { }

  headers = [ "Id", "Nombre", "Apellidos", "Correo", "Dni", "Direccion", "Teléfono", "Rol" , "Opciones" ];
  users!:User[];

  ngOnInit(): void {
       this.getUsers();



  }

  delete(id:number){
    return this.service.deleteUser(id).subscribe(data=>{
      this.getUsers();
    })
  }


  getUsers(){
    return this.service.test().subscribe(data=>{
      this.users = data;
    })
  }

  pdf(){

    return this.http.get('http://localhost:8082/user/pdfreport',httpOptions).subscribe(data=>{


    })

  }

}

