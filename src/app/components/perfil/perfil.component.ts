import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private service:ServiceService) { }

  change=false;
  user1 : any = new User();
  userform:any = new User();


  ngOnInit(): void {

    this.service.getSessionData().subscribe(data =>{
       this.service.getUser(data.id).subscribe(user=>{
        this.user1 = user;
       })
    })

  }


edit(){

    return this.service.editUser(this.user1.id,this.userform).subscribe(data => {
      console.log(data);
    })




}










}
