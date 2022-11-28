import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
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

  ngOnInit(): void {

    this.id = this.router.snapshot.params['id'];
    this.getProduct();
    this.getProducts();

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
      this.viewImage(data.imagen_id)
    })
  }

  getProduct2(id:number){
    this.http.get<Product>('http://localhost:8082/product/' + id,httpOptions).subscribe(data=>{
      this.product = data;
      this.viewImage(data.imagen_id)
    })
  }



  getLast(){
    this.newId = this.product.id - 1 ;

    if(this.newId < 1 ){
      this.route.navigate(['ver/producto/1'])
    }else{
      this.route.navigate(['ver/producto/' + this.newId])
      this.getProduct2(this.newId);
    }
  }

  getNext(){
    this.newId = this.product.id + 1 ;

    if(this.newId > this.products.length){
    }else{
      this.route.navigate(['ver/producto/' + this.newId])
      this.getProduct2(this.newId);
    }
  }

  getProducts(){

    this.http.get<Product[]>('http://localhost:8082/product/all',httpOptions)
    .subscribe(
      data=>{
        this.products = data;
      }
    );
}



}
