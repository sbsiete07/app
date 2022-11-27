import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router, private service:ServiceService) { }

  ngOnInit(): void {
  }

  user1 : User = new User();


  addUser(){
    this.service.createUser(this.user1).subscribe(data => {
      alert("Usuario creado con éxito, gracias por unirte a nosotros")
      this.router.navigate(["/login"])
    },error =>{
      console.log("-------------->" + error);
    })

  }


}
