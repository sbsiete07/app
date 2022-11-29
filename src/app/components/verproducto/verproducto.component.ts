import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Coments } from 'src/app/model/coments';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { httpOptions } from 'src/environments/environment';

@Component({
  selector: 'app-verproducto',
  templateUrl: './verproducto.component.html',
  styleUrls: ['./verproducto.component.css']
})
export class VerproductoComponent implements OnInit {

  constructor(private router:ActivatedRoute,private http:HttpClient,private route:Router) { }

  id!:number;

  product:Product = new Product();
  productForm:Product = new Product();
  mapImages = new Map();
  postResponse: any;
  uploadedImage!: File;
  dbImage: any;
  successResponse!: string;
  image: any;
  newId!:number;
  products!:Product[];
  coments!:Coments[];
  newComent:Coments = new Coments();


  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.getUser();
    this.getProduct();
    this.getComents(this.product.id);

  }

  getUser(){
    this.http.get<User>('http://localhost:8082/session/',httpOptions).subscribe(data=>{
      this.newComent.user = data;
    })
  }

  viewImage(id:number)  {
    this.http.get('http://localhost:8082/get/img/' + id, httpOptions )
    .subscribe(
      res => {
        this.postResponse = res;
        this.mapImages.set(id,'data:image/jpeg;base64,' + this.postResponse.image)
      }
    );
}

public onImageUpload(event:any) {
  this.uploadedImage = event.target.files[0];

}

imageUploadAction(): void {
  const imageFormData = new FormData();
  imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);

  this.http.patch('http://localhost:8082/image/'+ this.product.imagen_id, imageFormData, { observe: 'response' })
    .subscribe((response) => {
      if (response.status === 200) {
        this.postResponse = response;
        this.successResponse = this.postResponse.body.message;

      } else {
        this.successResponse = 'Image not uploaded due to some error!';
      }
    }
    );
  }

  getProduct(){
    this.http.get<Product>('http://localhost:8082/product/' + this.id,httpOptions).subscribe(data=>{
      this.product = data;
      this.newComent.product = data;

      this.viewImage(data.imagen_id)
    })
  }


  getComents(id:number){
      this.http.get<Coments[]>('http://localhost:8082/coments/product/'+ this.id,httpOptions).subscribe(data=>{

      this.coments = data;

    });
  }
  comentar(){

    this.http.post<Coments>('http://localhost:8082/coments/',this.newComent,httpOptions).subscribe(data=>{
      this.getComents(this.newComent.product.id);
      this.newComent.comentarios = "";
    })

  }


}
