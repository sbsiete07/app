import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/model/carrito';
import { User } from 'src/app/model/user';
import { ServiceService } from 'src/app/service/service.service';
import { httpOptions } from 'src/environments/environment';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private service:ServiceService,private http:HttpClient) { }



  headers = [ "Producto", "Nombre del producto", "Cantidad", "Precio", "Opciones"];


  carts!:Carrito[];
  totalprecio:number=0;
  isLogged = this.service.checkSession();
  isAdmin:any = false;
  user!:User;
  sizeCarrito: any=0;
  postResponse: any;
  cantidadTotal:number=0;

  mapImages = new Map();

  ngOnInit(): void {

    this.service.checkSessionAdmin().subscribe(data=>{
      if(data != true){

      }else{
        this.isAdmin = data;
      }
    })

    this.getCart();
    this.getSizeCarrito();
    this.getTotal();
    this.getTotal2();
  }



getCart(){

  this.http.get<Carrito[]>('http://localhost:8082/carrito/',httpOptions).subscribe(data=>{
    this.carts = data;
    for(let p of this.carts){
      this.viewImage(p.product.imagen_id)
    }

  })
}

addCart(id:number,sessionUser:number){

  this.http.post<Carrito>('http://localhost:8082/carrito/' + id, sessionUser,httpOptions).subscribe(data=>{
    this.getCart();
    this.getTotal();
    this.getTotal2();
  })
}

getUser(id:number){

  this.http.get<User>('http://localhost:8082/session/',httpOptions).subscribe(data=>{
    this.addCart(id,data.id)

  })
}

deleteCart(id:number){
  this.http.delete<Carrito>('http://localhost:8082/carrito/delete/' + id,httpOptions).subscribe(data=>{
    this.getCart();
    this.getTotal();
    this.getTotal2();
    this.http.get('http://localhost:8082/carrito/count',httpOptions).subscribe(data2=>{
      this.sizeCarrito = data2;
      if(this.sizeCarrito == 0){
        this.cantidadTotal = 0;
        this.totalprecio = 0;
      }
    })
  })
}

logout(){

  this.isLogged = true;
  this.isAdmin = false;
  this.service.logoutSession();

}


getSizeCarrito(){

  this.http.get('http://localhost:8082/carrito/count',httpOptions).subscribe(data2=>{
      this.sizeCarrito = data2;
    })

}

getTotal(){

  this.http.get<Carrito[]>('http://localhost:8082/carrito/',httpOptions).subscribe(data=>{

    let total = 0;
    for(let precio of data){
      total += (precio.cantidad * precio.product.precio);
      this.totalprecio = total;
    }

    return this.totalprecio;

  })
}

getTotal2(){

  this.http.get<Carrito[]>('http://localhost:8082/carrito/',httpOptions).subscribe(data=>{

    let total = 0;
    for(let precio of data){
      total += precio.cantidad;
      this.cantidadTotal = total;
    }

    return this.cantidadTotal;

  })
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


}
