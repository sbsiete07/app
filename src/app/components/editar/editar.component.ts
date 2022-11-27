import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  constructor(private router:ActivatedRoute,private service:ServiceService) { }
  id!:number;
  user1:any= new User();
  userform:any = new User();

  ngOnInit(): void {

    this.id = this.router.snapshot.params['id'];

    this.service.getUser(this.id).subscribe(data=>{
      this.user1 = data;
    })

  }




  edit(){
    console.log(this.user1)
    return this.service.editUser(this.user1.id,this.userform).subscribe(data => {
      console.log(data);
    })

  }

}
