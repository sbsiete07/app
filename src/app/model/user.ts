import { Rol } from "./rol";

export class User{
  id!: number;
  nombre!:String;
  apellido!:String;
  correo!:String;
  password!:String;
  dni!:String;
  telefono!:number;
  direccion!:String;
  rol!:Rol;
}
