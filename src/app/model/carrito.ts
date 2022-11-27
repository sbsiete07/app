import { Product } from "./product";
import { User } from "./user";

export class Carrito{
  id!: number;
  cantidad!:number;
  product!:Product;
  user!:User;
}
