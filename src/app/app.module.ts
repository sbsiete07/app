import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditarComponent } from './components/editar/editar.component';
import { UploadProductComponent } from './components/ProductProcess/upload-product/upload-product.component';
import { ProductsCrudComponent } from './components/products-crud/products-crud.component';
import { ListausuariosComponent } from './components/listausuarios/listausuarios.component';
import { ListaproductosComponent } from './components/listaproductos/listaproductos.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { VerproductoComponent } from './components/verproducto/verproducto.component';
import { TestComponent } from './components/test/test.component';








@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    PerfilComponent,
    NavbarComponent,
    AdminComponent,
    EditarComponent,
    UploadProductComponent,
    ProductsCrudComponent,
    ListausuariosComponent,
    ListaproductosComponent,
    EditarProductoComponent,
    CarritoComponent,
    VerproductoComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
