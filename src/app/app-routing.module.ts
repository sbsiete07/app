import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './service/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UserGuardGuard } from './service/user-guard.guard';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './service/admin.guard';
import { EditarComponent } from './components/editar/editar.component';
import { UploadProductComponent } from './components/ProductProcess/upload-product/upload-product.component';
import { ProductsCrudComponent } from './components/products-crud/products-crud.component';
import { ListausuariosComponent } from './components/listausuarios/listausuarios.component';
import { ListaproductosComponent } from './components/listaproductos/listaproductos.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate:[AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate:[AuthGuard]},
  {path: 'perfil', component: PerfilComponent, canActivate:[UserGuardGuard]},
  {path: 'admin', component: AdminComponent, canActivate:[AdminGuard]},
  {path: 'users', component: ListausuariosComponent, canActivate:[AdminGuard]},
  {path: 'listaproductos', component: ListaproductosComponent, canActivate:[AdminGuard]},
  {path: 'admin/editar/:id', component: EditarComponent, canActivate:[AdminGuard]},
  {path: 'upload/product', component: UploadProductComponent, canActivate:[AdminGuard]},
  {path: 'productos', component: ProductsCrudComponent},
  {path: 'editar/producto/:id', component: EditarProductoComponent, canActivate: [AdminGuard]},
  {path: 'carrito', component: CarritoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
