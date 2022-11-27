import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ServiceService } from 'src/app/service/service.service';
import { httpOptions } from 'src/environments/environment';

@Component({
  selector: 'app-listaproductos',
  templateUrl: './listaproductos.component.html',
  styleUrls: ['./listaproductos.component.css']
})
export class ListaproductosComponent implements OnInit {

  constructor(private service:ServiceService,private http:HttpClient) { }

  headers = [ "Id", "Nombre", "Marca", "Precio", "Stock", "Tipo", "Imagen", "Opciones" ];
  products!:Product[];
  product = new Product();
  postResponse: any;
  lenght!:number;
  mapImages = new Map();


  ngOnInit(): void {

    this.getProducts();

  }

  deleteProduct(id:number){


      this.http.delete('http://localhost:8082/product/' + id).subscribe(data=>{
        this.getProducts();
      })


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




}
