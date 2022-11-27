import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { httpOptions } from 'src/environments/environment';

@Component({
  selector: 'app-upload-product',
  templateUrl: './upload-product.component.html',
  styleUrls: ['./upload-product.component.css']
})
export class UploadProductComponent implements OnInit {

  constructor(private httpClient:HttpClient,private router:Router) { }

  ngOnInit(): void {

  }

  product:Product = new Product();
  name!:String;
  error!:String;




  addProduct(){

    if(this.uploadedImage == null){
      this.error=" Complete todos los campos para añadir el producto"
    }

    this.imageUploadAction();

    this.httpClient.post<Product>('http://localhost:8082/product/',this.product,httpOptions).subscribe(data=>{

          this.product.imagen_id = data.id;
          this.httpClient.patch<Product>('http://localhost:8082/product/' + data.id,this.product,httpOptions).subscribe(data2=>{
          this.router.navigate(['listaproductos'])
          })


    });

  }



  uploadedImage!: File;
  dbImage: any;
  postResponse: any;
  successResponse!: string;
  image: any;
  nombreimagen!:String;
  Newproduct!:Product;


  public onImageUpload(event:any) {
    this.uploadedImage = event.target.files[0];
    this.name = this.uploadedImage.name
  }

  imageUploadAction(): void {
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);

    this.httpClient.post('http://localhost:8082/upload/image/', imageFormData, { observe: 'response' })
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



  viewImage() {
    this.httpClient.get('http://localhost:8082/get/img/' + 1)
      .subscribe(
        res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
      );
  }













}
