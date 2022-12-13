import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  constructor(private router:ActivatedRoute,private service:ServiceService,private route:Router) { }
  id!:number;
  user1:any= new User();
  userform:any = new User();
  error!:string;

  serchfind!:boolean;
  correoReg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  searchdni!:boolean;
  dniReg = new RegExp(/^(\d{8})([A-Z])$/);

  searchTelefono!:boolean;
  tlfReg = new RegExp(/^(\d{9})$/);

  searchPassword!:boolean;
  passwordReg = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);



  ngOnInit(): void {

    this.id = this.router.snapshot.params['id'];

    this.service.getUser(this.id).subscribe(data=>{
      this.user1 = data;
    })

  }




  edit(){


    
    
   
    


    if(this.userform.telefono != null){
      this.searchTelefono = this.tlfReg.test(this.userform.telefono.toString());
      if(this.searchTelefono){
        this.service.editUser(this.user1.id,this.userform).subscribe(data => {
          this.route.navigate(["/users"])
        },error=>{
          this.error = "No se puede actualizar en este momento"
        });
      }else{
        this.error = "Revise los campos de telefono"
      }

    }

    if(this.userform.dni != null){
      this.searchdni = this.dniReg.test(this.userform.dni);
      if(this.searchdni){
        this.service.editUser(this.user1.id,this.userform).subscribe(data => {
          this.route.navigate(["/users"])
        },error=>{
          this.error = "No se puede actualizar en este momento"
        });
      }else{
        this.error = "Revise el campo del dni"
      }
    }

    if(this.userform.correo != null){
      this.serchfind = this.correoReg.test(this.userform.correo);
      if(this.serchfind){
        this.service.editUser(this.user1.id,this.userform).subscribe(data => {
          this.route.navigate(["/users"])
        },error=>{
          this.error = "No se puede actualizar en este momento"
        });
      }else{
        this.error = "Revise el campo del correo"
      }
    }
    
    if(this.userform.password != null){
      this.searchPassword = this.passwordReg.test(this.userform.password);
      if(this.searchPassword){
        this.service.editUser(this.user1.id,this.userform).subscribe(data => {
          this.route.navigate(["/users"])
        },error=>{
          this.error = "No se puede actualizar en este momento"
        });
      }else{
        this.error = "La contraseña debe contener 1 mayusucla y 8 caracteres"
      }
    }





  }








  }


