import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { httpOptions } from 'src/environments/environment';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  constructor(private router:ActivatedRoute,private http:HttpClient,private route:Router) { }

  id!:number;
  product:Product= new Product();
  productForm:Product= new Product();
  mapImages = new Map();
  postResponse: any;
  uploadedImage!: File;
  dbImage: any;
  successResponse!: string;
  image: any;
  nombreimagen!:String;



  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.getProduct();
  }

  getProduct(){
    this.http.get<Product>('http://localhost:8082/product/' + this.id,httpOptions).subscribe(data=>{
      this.product = data;
      this.viewImage(data.imagen_id)
    })
  }

  editProduct(){
    this.http.patch<Product>('http://localhost:8082/product/' + this.id,this.productForm,httpOptions).subscribe(data=>{
      if(this.uploadedImage != null){
        this.editImage();
      }
      this.route.navigate(['/listaproductos']);
    })
  }

  editImage(){
    this.imageUploadAction();
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




}
