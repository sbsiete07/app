import { Rol } from "./rol";

export class User{
  id!: number;
  nombre!:String;
  apellido!:String;
  correo!:string;
  password!:string;
  dni!:string;
  telefono!:number;
  direccion!:String;
  rol!:Rol;
}
