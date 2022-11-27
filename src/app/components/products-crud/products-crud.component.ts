import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Carrito } from 'src/app/model/carrito';
import { Image } from 'src/app/model/image';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { ServiceService } from 'src/app/service/service.service';
import { httpOptions } from 'src/environments/environment';



@Component({
  selector: 'app-products-crud',
  templateUrl: './products-crud.component.html',
  styleUrls: ['./products-crud.component.css']
})
export class ProductsCrudComponent implements OnInit {


  constructor(private http:HttpClient,private router:Router,private service:ServiceService) {}

  isLogged = this.service.checkSession();
  isAdmin:any = false;
  user!:User;
  sizeCarrito: any;
  product = new Product();
  postResponse: any;
  headers = ['Id','Nombre','Marca','Precio','Stock','Imagen'];
  products!:Product[];
  lenght!:number;
  error!:String;

  mapImages = new Map();


ngOnInit(): void {

  this.service.checkSessionAdmin().subscribe(data=>{
    if(data != true){

    }else{
      this.isAdmin = data;
    }
  })

    this.getProducts();
    this.getSizeCarrito(); this.service.checkSessionAdmin().subscribe(data=>{
      if(data != true){

      }else{
        this.isAdmin = data;
      }
    })

}

getUser(id:number){

  this.http.get<User>('http://localhost:8082/session/',httpOptions).subscribe(data=>{
    this.user = data;
    this.addCart(id,data.id)
    this.http.get('http://localhost:8082/carrito/count',httpOptions).subscribe(data2=>{
      this.sizeCarrito = data2;
    })
  },err=>{
    this.error = "Inicia sesion para añadir productos"
    console.log(err)
  })
}




logout(){

  this.isLogged = true;
  this.isAdmin = false;
  this.service.logoutSession();


}

getProducts(){

    this.http.get<Product[]>('http://localhost:8082/product/all',httpOptions)
    .subscribe(
      data=>{
        this.products = data;
        for(let p of this.products){
          this.viewImage(p.imagen_id)

        }
      }
    );
}

viewImage(id:number)  {

    this.http.get('http://localhost:8082/get/img/' + id ,httpOptions )
    .subscribe(
      res => {
        this.postResponse = res;
        this.mapImages.set(id,'data:image/jpeg;base64,' + this.postResponse.image)
      }
    );
}

addCart(id:number,sessionUser:number){

  this.http.post<Carrito>('http://localhost:8082/carrito/' + id, sessionUser,httpOptions).subscribe(data=>{
    console.log(data);
    this.http.get('http://localhost:8082/carrito/count',httpOptions).subscribe(data2=>{
      this.sizeCarrito = data2;
    })
  })
}

getSizeCarrito(){
  this.http.get('http://localhost:8082/carrito/count',httpOptions).subscribe(data2=>{
      this.sizeCarrito = data2;
    })

}



}


